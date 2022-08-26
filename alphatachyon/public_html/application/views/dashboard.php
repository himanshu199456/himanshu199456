<?php 
	$this->load->view('common/header'); 
	$this->load->view('common/nav');   
?>
 <!-- Content start Here -->
<section class="rowContent">
 <div class="borderGreen">
  <div class="container">
    <div class="adminDashboard">
     <div class="innerRowBox">
		<?php $user = $this->session->userdata('logged_in');?>
		<h3><?php echo $user['user_name'];?></h3>
		<small>to</small>
		<strong>Welcome to APMC Portal</strong>
	 </div>	
    </div>
	</div>
  </div>
</section>
<!-- Content End Here -->
<?php $this->load->view('common/footer'); ?>
