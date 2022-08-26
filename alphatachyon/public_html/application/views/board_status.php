<?php 
  $this->load->view('common/header'); 
  $this->load->view('common/nav');   
?>
<!-- Content start Here -->
<section class="rowContent">
   <div class="container">
      <div class="boardStatusInfo">
      <h1>LAST DATA SEND & BOARD STATUS INFO</h1>
    
    <div class="boardStatusTable">
<table cellspacing="0" rules="rows" border="1" style="margin-top:20px;font-family:Verdana;font-size:X-Small;
width:100%;border-collapse:collapse;">
      <tr align="center" style="color:White;background-color:#990000;font-weight:bold;">
        <td style="line-height:25px;">Board Location</td>
        <td style="line-height:25px;">Last Data Send ON</td>
        <td style="line-height:25px;">Board Status As ON</td>
        <td style="line-height:25px;">Board Status</td>
      </tr> 
      <?php foreach($board_status as $res):?>
      <tr align="center" style="color:#333333;background-color:#FFFBD6;white-space:nowrap;">
        <td style="line-height:25px;"><?php echo $res->board_name;?></td>
        <td style="line-height:25px;"><?php echo date('d/M/Y h:i:s', strtotime($res->last_data_send_on));?></td>
        <td style="line-height:25px;"><?php echo date('d/M/Y h:i:s', strtotime($res->last_data_send_on));?></td>
        <td style="line-height:25px; background-color:Orange;font-weight:bold;">
		<?php echo ($res->send_status == '1') ? 'REQUESTED' : ''; ?></td>
      </tr>
    <?php endforeach; ?>
         
    </table>
    
    </div>
    
    </div>
  </div>  
   </div>
</section>
<!-- Content End Here -->
<?php $this->load->view('common/footer'); ?>

