<?php 
  $this->load->view('common/header'); 
  $this->load->view('common/nav');   
?>
<!-- Content start Here -->
<section class="rowContent">
<div class="container">
  <div class="innerRowBox">
   <div class="createUserBox MessageMasterMain">
    <table id="" align="center" style="width: 75%; background-color: #C2E3BF;" cellpadding="2">
    <tbody>
      <tr>
        <td align="center" style="background-color: #008000; color: #FFFFFF; font-size: large;" bgcolor="#336699" colspan="2">SCROLLING MESSAGE DETAILS</td>
      </tr>
      <tr>
        <td>
          <form action="<?php echo base_url(); ?>auth_admin/edit_message_master/<?php echo $this->uri->segment(3);?>" method="POST" id="message">
          <table  align="center" style="width: 100%; background-color: #C2E3BF;">
          <tbody>
            <tr>
               <td style="width: 25%; font-weight: bold;" align="right"></td>
              <td style="width: 75%; text-align: left;" class="error"></td>
            </tr>
            <tr>
              <td style="width: 25%; font-weight: bold;" align="right">Language :</td>
              <td style="width: 75%; text-align: left;">
                <table>
                <tbody>
                <tr>
                  <td><input type="radio" name="language" value="0" <?php if($message_detail->language == '0'){ ?>checked="checked" <?php } ?>><label>English</label></td>
                  <td style="padding-left:10px;"><input type="radio" <?php if(!empty($message_detail->language) && $message_detail->language == '1'){ ?>checked="checked" <?php } ?> name="language" value="1"><label>Hindi</label></td>
                </tr>
              </tbody>
               </table>
             </td>
          </tr>
          <tr>
            <td align="right" style="width: 25%; height: 30px; font-weight: bold;">Message :</td>
            <td style="height: 30px; text-align: left;">
              <input name="scroll_message" id="board-message" type="text" value="<?php if(!empty($message_detail->scroll_message)){ echo $message_detail->scroll_message; } ?>" maxlength="250" style="font-family:ARIAL;font-size:12pt;height:23px;width:95%;">  
            </td>
          </tr>
          <tr>
            <td align="right" style="width: 25%; height: 30px; font-weight: bold;">Board :</td>
            <td style="height: 30px; text-align: left;" width="75%">
              <select name="board" >
                <?php foreach($user_board as $key=>$value): ?>
                  <option <?php if(isset($message_detail->board_id) && !empty($message_detail->board_id) && $message_detail->board_id == $key){ echo "selected"; } ?> value="<?php echo $key;?>"><?php echo $value;?></option>
                <?php endforeach; ?>
              </select>
            </td>
          </tr>
          <tr>
            <td style="width: 89px"></td>
            <td align="center">
              <input type="submit" name="save" value="SAVE" style="height:24px;width:80px;">
              <input type="submit" id="cancel" value="CANCEL" style="height:24px;width:80px;">
            </td>
          </tr>
          <tr>
            <td style="width: 89px"><br></td>
            <td align="center" style="font-size: medium; font-weight: bold"></td>
          </tr>
        </tbody>
        </table>
      </form>
      </td>
      </tr>
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
  $('#message').submit(function() {
    var flag = true;
    if ($("#board-message").val().trim().length <= 0) {
      $(".error").html('Please enter Message, It cannot be left blank.');
      flag = false;
    }
    return flag;
  });

  $('#cancel').click(function(){
    window.location.href='<?php echo base_url(); ?>auth_admin/message_master';
    return false;
  })
});

</script>

