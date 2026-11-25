/* =========================================================
   MODUL UNGGAH GOOGLE DRIVE
   Memakai Google Identity Services (OAuth 2.0 tanpa kunci rahasia).
   Cakupan izin: drive.file — hanya berkas yang dibuat lewat situs ini,
   sehingga situs TIDAK dapat membaca berkas lain di Drive pengguna.
   ========================================================= */

window.GDrive = {
  clientId: null,
  _token: null,
  _expiry: 0,
  _tokenClient: null,

  SCOPE: 'https://www.googleapis.com/auth/drive.file',

  /* Apakah pustaka Google sudah siap dipakai */
  ready(){
    return !!(window.google && window.google.accounts && window.google.accounts.oauth2);
  },

  setClientId(id){
    const clean = String(id || '').trim();
    if (clean !== this.clientId){
      this.clientId = clean;
      this._tokenClient = null;
      this._token = null;
      this._expiry = 0;
    }
  },

  /* Meminta izin akses (menampilkan jendela login Google bila perlu) */
  getToken(){
    return new Promise((resolve, reject) => {
      if (!this.clientId) return reject(new Error('OAuth Client ID Google belum diatur. Buka tab "Berkas & Unggahan" untuk mengaturnya.'));
      if (!this.ready())  return reject(new Error('Pustaka Google belum termuat. Periksa koneksi internet, lalu muat ulang halaman.'));

      /* Token yang masih berlaku dipakai ulang (sisa umur > 1 menit) */
      if (this._token && Date.now() < this._expiry - 60000) return resolve(this._token);

      try{
        if (!this._tokenClient){
          this._tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: this.clientId,
            scope: this.SCOPE,
            callback: (resp) => {
              if (resp && resp.access_token){
                this._token = resp.access_token;
                this._expiry = Date.now() + ((resp.expires_in || 3600) * 1000);
                if (this._pendingResolve) this._pendingResolve(this._token);
              } else {
                const msg = (resp && resp.error_description) || (resp && resp.error) || 'Izin akses Google tidak diberikan.';
                if (this._pendingReject) this._pendingReject(new Error(msg));
              }
              this._pendingResolve = null;
              this._pendingReject = null;
            },
            error_callback: (err) => {
              const m = (err && err.type === 'popup_closed')
                ? 'Jendela izin Google ditutup sebelum selesai.'
                : ((err && err.message) || 'Gagal memperoleh izin akses Google.');
              if (this._pendingReject) this._pendingReject(new Error(m));
              this._pendingResolve = null;
              this._pendingReject = null;
            }
          });
        }
        this._pendingResolve = resolve;
        this._pendingReject = reject;
        this._tokenClient.requestAccessToken();
      } catch(e){
        reject(new Error('Gagal memulai proses izin Google: ' + (e.message || e)));
      }
    });
  },

  /* Unggah satu berkas ke folder tujuan.
     onProgress(persen) dipanggil selama proses berlangsung. */
  async upload(file, folderId, onProgress){
    const token = await this.getToken();

    const metadata = { name: file.name, mimeType: file.type || 'application/octet-stream' };
    const folder = String(folderId || '').trim();
    if (folder) metadata.parents = [folder];

    const boundary = '----RegistryUpload' + Math.random().toString(36).slice(2);
    const body = new Blob([
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`,
      JSON.stringify(metadata),
      `\r\n--${boundary}\r\nContent-Type: ${metadata.mimeType}\r\n\r\n`,
      file,
      `\r\n--${boundary}--\r\n`
    ], { type: 'multipart/related; boundary=' + boundary });

    const result = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,mimeType,size');
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.setRequestHeader('Content-Type', 'multipart/related; boundary=' + boundary);

      if (xhr.upload && typeof onProgress === 'function'){
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300){
          try { resolve(JSON.parse(xhr.responseText)); }
          catch(e){ reject(new Error('Balasan Google Drive tidak dapat dibaca.')); }
        } else {
          let m = 'Unggahan gagal (kode ' + xhr.status + ').';
          try {
            const err = JSON.parse(xhr.responseText);
            if (err.error && err.error.message) m = 'Google Drive: ' + err.error.message;
          } catch(e){}
          if (xhr.status === 404) m += ' Periksa apakah ID folder tujuan benar dan Anda punya akses tulis ke folder tersebut.';
          if (xhr.status === 403) m += ' Periksa apakah Google Drive API sudah diaktifkan dan Anda punya izin menulis di folder tujuan.';
          reject(new Error(m));
        }
      };
      xhr.onerror = () => reject(new Error('Gangguan jaringan saat mengunggah.'));
      xhr.send(body);
    });

    /* Atur berbagi ke "siapa saja yang memiliki tautan" agar bisa
       ditampilkan di situs publik tanpa login. */
    try {
      await fetch(`https://www.googleapis.com/drive/v3/files/${result.id}/permissions?supportsAllDrives=true`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'reader', type: 'anyone' })
      });
    } catch(e){
      console.warn('Berkas terunggah, tetapi izin berbagi gagal diatur otomatis.', e);
      result._shareWarning = true;
    }

    return result;
  }
};

/* Bantuan tampilan ukuran berkas */
window.formatBytes = function(bytes){
  const b = Number(bytes);
  if (!b || isNaN(b)) return '';
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b/1024).toFixed(0) + ' KB';
  if (b < 1073741824) return (b/1048576).toFixed(1) + ' MB';
  return (b/1073741824).toFixed(2) + ' GB';
};
