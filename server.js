const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let karyawan = [
    { id: 1, nama: "Budi", posisi: "Backend Developer" }
];

let departemen = [
    { id_departemen: "DEPT-01", nama_departemen: "Information Technology", jumlah_karyawan: 15 },
    { id_departemen: "DEPT-02", nama_departemen: "Human Resources", jumlah_karyawan: 5 }
];

// Register Akun Baru
app.post('/api/auth/register', (req, res) => {
    const { nama_lengkap, email, password, password_confirmation } = req.body;
    if (!nama_lengkap || !email || !password) {
        return res.status(400).json({ status: "error", message: "Semua field harus diisi" });
    }
    res.status(200).json({ status: "success", message: "Registrasi berhasil, silakan login." });
});

// Login Akun
app.post('/api/auth/login', (req, res) => {
    const { email } = req.body;
    res.status(200).json({
        status: "success",
        message: "Login berhasil",
        data: {
            user: { id: 1, nama_lengkap: "Budi Santoso", email: email || "budi@ptmajusejahtera.com" },
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockTokenUASAnda..."
        }
    });
});

// Ambil Semua Data Karyawan
app.get('/api/karyawan', (req, res) => {
    res.status(200).json({ status: "success", data: karyawan });
});

// Tambah Karyawan Baru
app.post('/api/karyawan', (req, res) => {
    const { nama, posisi } = req.body;
    const newKaryawan = { id: karyawan.length + 1, nama: nama || "Tanpa Nama", posisi: posisi || "Staff" };
    karyawan.push(newKaryawan);
    res.status(200).json({ status: "success", data: newKaryawan });
});

// Update Data Karyawan
app.put('/api/karyawan/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nama, posisi } = req.body;
    let index = karyawan.findIndex(k => k.id === id);
    if (index !== -1) {
        karyawan[index].nama = nama || karyawan[index].nama;
        karyawan[index].posisi = posisi || karyawan[index].posisi;
        return res.status(200).json({ status: "success", data: karyawan[index] });
    }
    res.status(404).json({ status: "error", message: "Karyawan tidak ditemukan" });
});

// Hapus Data Karyawan
app.delete('/api/karyawan/:id', (req, res) => {
    const id = parseInt(req.params.id);
    karyawan = karyawan.filter(k => k.id !== id);
    res.status(200).json({ status: "success", message: "Data berhasil dihapus" });
});

// Ambil Data Departemen
app.get('/api/departemen', (req, res) => {
    res.status(200).json({ status: "success", data: departemen });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
