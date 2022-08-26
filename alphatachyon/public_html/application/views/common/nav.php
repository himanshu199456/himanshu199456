<ul class="slimmenu">
	<li>
		<a href="<?php echo base_url('auth_admin/dashboard');?>">Dashboard</a>
	</li>
	<?php $user = $this->session->userdata('logged_in');?>
	<li><a href="#">Master &nbsp;</a>
		<ul>
			<?php if($user['roll'] == '1'){ ?>
				<li><a href="<?php echo base_url('auth_admin/board_master');?>">Boards</a></li>
				<li><a href="<?php echo base_url('auth_admin/commodity_type');?>">Commodity Type</a></li>
				<li><a href="<?php echo base_url('auth_admin/commodity');?>">Commodity</a></li>
			<?php } ?>
			<li><a href="<?php echo base_url('auth_admin/message_master');?>">Scrolling Messages</a></li>
			<?php if($user['roll'] == '1'){ ?>
				<li><a href="<?php echo base_url('auth_admin/user_add');?>">Users</a></li>
			<?php } ?>
		</ul>
	</li>
	<li>
		<a href="<?php echo base_url('auth_admin/send_data');?>">Send Data</a>
	</li>
	<?php if($user['roll'] == '1'){ ?>
	<li>
		<a href="<?php echo base_url('auth_admin/board_status');?>">Board Status</a>
	</li>
	<?php } ?>
	<li>
		<a href="<?php echo base_url('auth_admin/change_password');?>">Change password</a>
	</li>
	<li>
		<a href="<?php echo base_url('auth_admin/logout');?>">Logout</a>
	</li>
</ul>