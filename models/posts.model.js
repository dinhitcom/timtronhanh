var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    tieu_de: String,
    hinh_thuc_tro: String,
    quan_ly: String,
    so_phong_trong: Number,
    tong_so_phong: Number,
    o_toi_da: Number,
    gia: String,
    dien_tich: Number,
    gioi_tinh: String,
    doi_tuong: [],
    tien_nghi: [],
    moi_truong: [],
    quan_huyen: String,
    phuong_xa: String,
    dia_chi: String,
    mo_ta: String,
    ho_ten: String,
    dien_thoai: String,
    email: String,
    facebook: String,
    images: [],
    owner: mongoose.Schema.Types.ObjectID,
    ngay_dang: Date,
    ngay_cap_nhat: Date

}); 
module.exports = mongoose.model('Posts', postSchema, 'posts');
