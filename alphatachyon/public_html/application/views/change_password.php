<?php 
  $this->load->view('common/header'); 
  $this->load->view('common/nav');   
?>

<!-- Content start Here -->
<section class="rowContent">
<div class="container-fluid">
    <div class="innerRowBox">
   
   <div class="createUserBox BoardMasterMain changePassword">
    <form action="<?php echo base_url(); ?>auth_admin/change_password" method="POST" id="change_pass">
     <table style="width: 661px">
        <tbody><tr>
            <td colspan="2" style="background-color: #006600; padding:5px; text-align:center;">
                <strong><span style="color: gold">&nbsp;Change Password</span></strong></td>
        </tr>
        <?php $login_data = $this->session->userdata("logged_in"); ?>
        <tr>

            <td style="width: 163px; height: 20px; text-align: left">
                <span>User ID</span></td>
            <td style="width: 100px; height: 20px; padding-top:5px;text-align: center;">
                <input type="hidden" name="user_id" value="<?php echo $login_data['id']; ?>">
                <input name="" type="text" value="<?php echo $login_data['user_name']; ?>" readonly="readonly" id="" style="width:216px;"></td>
        </tr>
        <tr>
            <td style="width: 163px; height: 21px; text-align: left">
                <span>Old Password</span></td>
            <td style="width: 100px;text-align: center;">
                <input name="old_password" type="password" id="old-pass" style="width:216px;"></td>
        </tr>
        <tr>
            <td style="width: 163px; height: 23px; text-align: left">
                <span>New Password</span></td>
            <td style="width: 100px; height: 23px;text-align: center;">
                <input name="new_password" type="password" id="new-pass" style="width:216px;"></td>
        </tr>
        <tr>
            <td style="width: 163px; height: 21px; text-align: left">
                <span style="display:inline-block;width:165px;">Confirm New Password</span></td>
            <td style="width: 100px;text-align: center;">
                <input type="password" id="confirm-pass" style="width:216px;"></td>
        </tr>
        <tr>
            <td colspan="2" style="height: 21px; text-align: center" class="error">
              <span id="" style="color:Red;font-weight:bold;"><?php if(!empty($this->session->flashdata('msg'))){ echo $this->session->flashdata('msg'); }?></span></td>
        </tr>
        <tr>
            <td colspan="2" style="height: 21px; text-align: center">
                <input type="submit" name="update" value="Update" >
            </td>
        </tr>
    </tbody>
  </table>
    </form>
      </div>
  </div>  
</div>
</section>
<!-- Content End Here -->

<?php $this->load->view('common/footer'); ?>

<script>  
$(document).ready(function(){

  //Validation start//
  $('#change_pass').submit(function() {
    var flag = true;
    if ($("#old-pass").val().trim().length <= 0) {
      $(".error span").html('Please enter Old Password.');
      flag = false;
    }else if ($("#new-pass").val().trim().length <= 0) {
      $(".error span").html('Please enter new Password.');
      flag = false;
    }else if ($("#confirm-pass").val().trim().length <= 0) {
      $(".error span").html('Please enter confirm Password.');
      flag = false;
    }
    else if ($("#new-pass").val() != $("#confirm-pass").val()) {
      $(".error span").html('New Password and Confirm New Password not matched.');
      flag = false;
    }
    return flag;
  });

});

  
</script>  
