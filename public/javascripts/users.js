function inputEnable() {
    if ($('.editable').prop('disabled'))
        {$(".editable").prop('disabled', false);
        $('form').find('input:hidden').prop({type:"submit"});}
    else
        {$(".editable").prop('disabled', true);
        $('form').find('input:submit').prop({type:"hidden"});}
}