<?php $this->load->view('common/header'); ?>
<!-- Content start Here -->
<section class="rowContent">
<div class="container">
    <div class="innerRowBox">
    <form class="form-horizontal" role="form" id="login_form"  action="<?php echo base_url('auth_admin/login');?>">
      <div class="error loginerror" id="flash_message"></div>
      <div class="loginBox">
        <div class="col-lg-12 col-xs-12"> 
         <div class="form-controls"> 
        <label><strong>Login ID</strong></label>
        <input name="name" value="" class="inPuttx" type="text">
       </div> </div>
      
      <div class="col-lg-12 col-xs-12"> 
           <div class="form-controls">    
           <label><strong> Password</strong></label>
           <input type="password" name="password" class="inPuttx" value="">
          </div>
        </div>
        <div class="col-lg-12 col-xs-12"> 
           <div class="form-controls text-right">   
         <button class="">Login</button>
       </div></div>
      </div>
    </form>
  </div>  
</div>
</section>
<!-- Content End Here -->

<?php $this->load->view('common/footer'); ?>

<script>  
$(document).ready(function(){
  $('#login_form').submit(function() {
  resetErrors();
    var url = "<?php echo base_url('auth_admin/login');?>";  
      $.ajax({
          type: "POST",
            url: url,
            dataType:'json', 
            data: $("#login_form").serialize(), // serializes the form's elements.
            success: function(data)
            {
              if(data.status==1){             
                $('#flash_message').html('<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>You have been successfully logged in.</div>');
                window.location.href = "<?php echo base_url('auth_admin/dashboard')?>";
              }
              else if(data.status==0){
                if(jQuery.type(data.message)=='string'){
                  $('#flash_message').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+data.message+'</div>');
                }else{
                  $.each(data.message,function(field_name,msg){
                  var msg_data = '<label class="error" for="'+field_name+'">'+msg+'</label>';
                  $('input[name="' + field_name + '"], select[name="' + field_name + '"]').addClass('inputTxtError').after(msg_data);
                  
                }); 
               }
            }
          }
    });   
    return false;
  });
});
function resetErrors() {
  $('form input, form select').removeClass('inputTxtError');
  $('#flash_message').html('');
  $('label.error').remove();
}
</script>