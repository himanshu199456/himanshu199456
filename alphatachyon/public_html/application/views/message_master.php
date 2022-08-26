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
          <table id="" align="center" style="width: 100%; background-color: #C2E3BF;">
            <tbody>
              <tr>
              <td align="center">
                  <input type="submit" value="Add New Record" style="width:150px;" id="addBtn">
              </td>
            </tr>
            <tr>
              <td>&nbsp
                <?php if($this->session->flashdata('error_msg') != ''){ ?>
                  <div class="error alert alert-danger text-center" style="margin-bottom:15px;">
                    <strong><?php echo $this->session->flashdata('error_msg');?></strong>
                  </div>
                <?php } ?>
                <table tabindex="8" cellspacing="0" rules="rows" border="1" id="" style="font-family:Verdana;font-size:X-Small;width:100%;border-collapse:collapse;">
                   <tbody>
                    <tr align="center" style="color:White;background-color:#990000;line-height:30px;font-weight:bold;font-style:normal;text-decoration:none;">
                      <td style="width:15%; line-height:30px;">Language</td>
                      <td style="width:50%; line-height:30px;">Message</td>
                      <td style="width:15%; line-height:30px;">Board</td>
                      <td style="width:15%; line-height:30px;">Action</td>
                    </tr>
                    <?php if(count($board_message) > 0){
                    $i = 0;
                    foreach($board_message as $res): 
                   
                    foreach($res as $k):  $background = ($i%2==0) ? "#FFFBD6" : "white";
                    ?>
                    <tr align="center" style="color:#333333;background-color:<?php echo $background; ?>">
                      <td style="line-height:30px; padding: 10px 0;"><?php echo $k['language'] == '0' ? 'English' : 'Hindi'; ?></td>
                      <td style="font-family:ARIAL;line-height:30px; font-size:14px; padding: 10px 0;"><?php echo $k['scroll_message'];?></td>
                      <td style="line-height:30px; padding: 10px 0;"><?php echo $k['board_name'];?></td>
                      <td style="line-height:30px; padding: 10px 0;" align="center">
                      <a onclick="return confirm('Are you sure you want to edit this record?');" href="<?php echo base_url(); ?>auth_admin/edit_message_master/<?php echo $k['id']?>">EDIT </a>
                      <a onclick="return confirm('Are you sure you want to delete this record?');"  href="<?php echo base_url(); ?>auth_admin/delete_message_master/<?php echo $k['id']?>"> DELETE</a>
                      </td>
                    </tr>
                  <?php $i++; endforeach;  endforeach;  }else{ ?>
                    <tr align="center" style="color:#333333;background-color:#FFFBD6;">
                      <td colspan="4" align="center">No record found</td>
                    </tr>
                  <?php } ?>
                  </tbody>
                </table>
                </td>
            </tr>
          </tbody>
        </table>
      
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
  $('#addBtn').click(function(){
    window.location.href='<?php echo base_url(); ?>auth_admin/add_message_master';
    return false;
  })
});

</script>

