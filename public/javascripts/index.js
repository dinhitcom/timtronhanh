$("select[name='quan_huyen']").change(function() {
    var quan_huyen = $(this).val();
    if (quan_huyen==='all') {
        $("select[name='phuong_xa'").html('');
        $("select[name='phuong_xa']").append(
            "<option value='all'>Tất cả</option>"
        );
    } else {

    
    $.ajax({
        url: '/getWards',
        method: 'POST',
        data: { 'quan_huyen' : quan_huyen },
        success: function(data) {
            $("select[name='phuong_xa'").html('');
            $("select[name='phuong_xa'").append('<option selected="selected" value="all">Tất cả</option>')
                $.each(data, function(key, value){
                    $("select[name='phuong_xa']").append(
                        "<option value='"+value.name_with_type+"'>" + value.name_with_type + "</option>"
                    );
                });    
        }
     })
    }
});

var prices = document.getElementsByClassName('price');
function formatCurrency(n, separate = "."){
  var s = n.toString();
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  var ret = s.replace(regex, separate);
  return ret;
};
for (i = 0; i<prices.length; i++)
    prices[i].innerHTML = formatCurrency(prices[i].innerHTML)+`₫`;