const mongoose = require("mongoose");
var db = mongoose.connection;
var postModel = require("../models/posts.model");
var locationModel = require("../models/locations.model");
var getDistricts_query = locationModel.find({},'name_with_type slug -_id'); 
module.exports.posts = function(req, res) {
    postModel.find({}, function (err,data) {
        if (err) console.log(err);
        getDistricts_query.exec(function(err,districts){
            if (err) return console.log(err);
            res.render('posts', {
                'pagename': 'posts',
                data,
                districts
             });
        })
    })              
}; 
module.exports.create = function(req, res) {
    getDistricts_query.exec(function(err,data){
        if (err) return console.log(err);
        res.render('create_post', { 
            'pagename': 'posts',
            'status': 'logged',
            data
        });
    });
};
module.exports.postDetails = function(req,res) {
    var id = req.params.id;
    postModel.findOne({_id: id}, function(err, post) {
        if (err) {
            res.status(err.status || 500);
            res.render('error');
        } else res.render('post_details', { post, id })
    })  
}
// module.exports.getWards = function(req, res) {
//     var getWards_query = locationModel.findOne({name_with_type: req.body.quan_huyen}, 'xa_phuong -_id');
//     getWards_query.exec(function(err, data) {
//         if (err) return console.log(err);
//         res.send(Object.values(data.xa_phuong));
//     })
// }
module.exports.postCreate = function(req, res) {
    var post = new postModel();
    post.tieu_de = req.body.tieu_de;
    post.hinh_thuc_tro = req.body.hinh_thuc_tro;
    post.quan_ly = req.body.quan_ly;
    post.so_phong_trong = req.body.so_phong_trong;
    post.tong_so_phong = req.body.tong_so_phong;
    post.o_toi_da = req.body.o_toi_da;
    post.gia = req.body.gia;
    post.dien_tich = req.body.dien_tich;
    post.gioi_tinh = req.body.gioi_tinh;
    post.doi_tuong = req.body.doi_tuong;
    post.tien_nghi = req.body.tien_nghi;
    post.moi_truong = req.body.moi_truong;
    post.quan_huyen = req.body.quan_huyen;
    post.phuong_xa = req.body.phuong_xa;
    post.dia_chi = req.body.dia_chi;
    post.mo_ta = req.body.mo_ta;
    post.ho_ten = req.body.ho_ten;
    post.dien_thoai = req.body.dien_thoai;
    post.email = req.body.email;
    post.facebook = req.body.facebook;
    post.owner = req.session.userId;
    post.ngay_dang = new Date();
    post.ngay_cap_nhat = post.ngay_dang;
    req.files.forEach(element => {
        var path = element.path.replace(`\\`,"/").split('/').slice(1).join('/');
        post.images.push(path);
    });
    post.save(function(err) {
        if (err) console.log(err, post);
        
        res.redirect('/posts/'+post.id);
    });
}
module.exports.edit = function(req, res) {
    postModel.findOne({'_id':req.params.id}, function(err, data) {
        if (err) console.log(err)
        req.session.postId = req.params.id;
        getDistricts_query.exec(function(err, districts){
            res.render('post_edit', {
                'pagename': 'posts',
                'status': 'logged',
                data,
                districts
            })
        })
    })
}
module.exports.postEdit = function(req, res) {
    var update = {};
    update.tieu_de = req.body.tieu_de;
    update.hinh_thuc_tro = req.body.hinh_thuc_tro;
    update.quan_ly = req.body.quan_ly;
    update.so_phong_trong = req.body.so_phong_trong;
    update.tong_so_phong = req.body.tong_so_phong;
    update.o_toi_da = req.body.o_toi_da;
    update.gia = req.body.gia;
    update.dien_tich = req.body.dien_tich;
    update.gioi_tinh = req.body.gioi_tinh;
    update.doi_tuong = req.body.doi_tuong;
    update.tien_nghi = req.body.tien_nghi;
    update.moi_truong = req.body.moi_truong;
    update.quan_huyen = req.body.quan_huyen;
    update.phuong_xa = req.body.phuong_xa;
    update.dia_chi = req.body.dia_chi;
    update.mo_ta = req.body.mo_ta;
    update.ho_ten = req.body.ho_ten;
    update.dien_thoai = req.body.dien_thoai;
    update.email = req.body.email;
    update.facebook = req.body.facebook;
    post.ngay_cap_nhat = Date.now();
    postModel.findOneAndUpdate({'_id':req.session.postId},{$set: update},{upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.redirect('/users/posts');
    });
}
module.exports.delete = function(req, res) {
    postModel.deleteOne({'_id':req.params.id}, function (err) {
        if (err) console.log(err)
        return res.redirect('/users/posts')
    })
}

module.exports.search = function(req, res) {
    var query = {};
    if (req.body.quan_huyen != 'all')
        query.quan_huyen = req.body.quan_huyen;
    if (req.body.phuong_xa != 'all')
         query.phuong_xa = req.body.phuong_xa;
    // if (req.body.gia_tien != 'all')
    //     query.gia = JSON.parse(req.body.gia_tien);
       switch (req.body.gia_tien) {
            case "1":
                query.gia= {$lt: 1000000}
                break;
            case "2":
                query.gia= {$lt: 1500000, $gte: 1000000}
                break;
            case "3":
                query.gia= {$lt: 2000000, $gte: 1500000}
                break;
            case "4":
                query.gia= {$gte: 2000000}
                break;
       }
       switch (req.body.dien_tich) {
        case "1":
            query.dien_tich= {$lt: 15}
            break;
        case "2":
            query.dien_tich= {$lt: 20, $gte: 15}
            break;
        case "3":
            query.dien_tich= {$lt: 25, $gte: 20}
            break;
        case "4":
            query.dien_tich= {$gte: 25}
            break;
   }
    
     postModel.find(query, function(err, data) {
        if (err) console.log(err);
        if (!data.length) 
            res.render('search_result', {
            'result' : 'null'
            }); 
        
        else res.render('search_result', {
            'result' : data.length,
            data
        })
    })
}