$("select[name='quan_huyen']").change(function() {
    var quan_huyen = $(this).val();
    if (quan_huyen==='default') {
        $("select[name='phuong_xa'").html('');
        $("select[name='phuong_xa']").append(
            "<option value='default'>"+'-- Chọn Phường/Xã --'+"</option>"
        );
    } else {

    
    $.ajax({
        url: '/getWards',
        method: 'POST',
        data: { 'quan_huyen' : quan_huyen },
        success: function(data) {
            $("select[name='phuong_xa'").html('');
                $.each(data, function(key, value){
                    $("select[name='phuong_xa']").append(
                        "<option value='"+value.name_with_type+"'>"+value.name_with_type+"</option>"
                    );
                });    
        }
     })
    }
});

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
var price = document.getElementById('price').innerHTML;
function formatCurrency(n, separate = "."){
  var s = n.toString();
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  var ret = s.replace(regex, separate);
  return ret;
}
document.getElementById('price').innerHTML = formatCurrency(price)+`₫`;

var postTime = document.getElementById('timeformat').innerHTML
document.getElementById('timeformat').innerHTML = postTime.slice(0,35);




