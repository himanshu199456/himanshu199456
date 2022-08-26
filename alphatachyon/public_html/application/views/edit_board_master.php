<?php 
  $this->load->view('common/header'); 
  $this->load->view('common/nav');   
?>
<!-- Content start Here -->
<section class="rowContent">
<div class="container-fluid">
    <div class="innerRowBox">
   
   <div class="createUserBox BoardMasterMain">
    <h4 class="blueBg">Board Master</h4> 
     
    <table cellspacing="5" cellpadding="4" align="Center" style="color:#333333;width:80%;border-collapse:separate; border:1px solid gray; margin-bottom: 5px; border-spacing: 5px; float:left;">
      <form action="<?php echo base_url(); ?>auth_admin/edit_board_master/<?php echo $this->uri->segment(3); ?>" method="POST" id="baord_master">
      <tr>
        <td style="width:110px;">Board Name</td>  
        <td><input type="text" style="width:70%;" id="board_name" name="board_name" value="<?php if(!empty($board_detail)) { echo $board_detail; } ?>"></td> 
      </tr>
      <tr>
        <td style="width:110px;"></td>  
        <td class="error"><?php if(!empty($this->session->flashdata('error_msg'))){ echo $this->session->flashdata('error_msg'); } ?></td> 
      </tr>
      <tr>
        <td style="width:110px;"></td>  
        <td class="success"><?php if(!empty($this->session->flashdata('success_msg'))){ echo $this->session->flashdata('success_msg'); } ?></td> 
      </tr>
      <tr>
        <td colspan="2" style="text-align:center; padding-top:50px;">
        <input type="submit" name="save" value="Save">  
        <input type="submit" value="Delete" id="delete">  
        <input type="submit" value="Reset" id="reset">    
        </td> 
      </tr> 
    </form>
     </table> 
     
      <table cellspacing="0" cellpadding="4" align="Center" style="color:#333333;width:100%;border-collapse:collapse;">
    <tbody>
    <tr align="center" style="color:White;background-color:#1C5E55;font-weight:bold;font-size:14px;line-height:24px;">
      <td align="center" scope="col">&nbsp;</td>
      <td align="center" scope="col">BOARD_ID</td>
      <td align="center" scope="col">DESCRIPTION</td>
      <td align="center" scope="col">LST_DATA_SEND_ON</td>
        <td align="center" scope="col">STATUS_RECEIVED</td>
      <td align="center" scope="col">STATUS_ON</td>
      <td align="center" scope="col">status</td>
    </tr>
    <?php foreach($board_master as $res):?>
      <tr align="center" style="background-color:#E3EAEB;line-height:34px;font-size:12px;">
        <td><u><a href="<?php echo base_url(); ?>auth_admin/edit_board_master/<?php echo $res->id;?>">Select</a></u></td>
        <td><?php echo $res->id;?></td>
        <td><?php echo $res->board_name;?></td>
        <td><?php echo date('d/M/Y h:i:s', strtotime($res->last_data_send_on));?></td>
        <td style="background-color:Orange;font-weight:bold;"><?php echo ($res->send_status == '1') ? 'REQUESTED' : ''; ?></td>
        <td><?php echo date('d/M/Y h:i:s', strtotime($res->last_data_send_on));?></td>
        <td>ACTIVE</td>
      </tr>
    <?php endforeach; ?>
    </tbody>
    </table>
     
   
    </div>
  </div>  
</div>
</section>
<!-- Content End Here -->
<?php $this->load->view('common/footer'); ?>
<script>  
$(document).ready(function(){

   //Validation start//
  $('#baord_master').submit(function() {
    var flag = true;
    if ($("#board_name").val().trim().length <= 0) {
      $(".error").html('Please enter board name, It cannot be left blank.');
      flag = false;
    }
    return flag;
  });
  $('#reset').click(function(){
    window.location.href='<?php echo base_url(); ?>auth_admin/board_master';
    return false;
  })
  $('#delete').click(function(){
    window.location.href='<?php echo base_url(); ?>auth_admin/delete_master_board/<?php echo $this->uri->segment(3); ?>';
    return false;
  })
});

</script>

