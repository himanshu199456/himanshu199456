<?php if ( ! defined("BASEPATH")) exit("No direct script access allowed");

/**
 * BackendPro
 *
 * A website backend system for developers for PHP 4.3.2 or newer
 *
 * @package         Backend Plant Your Tree
 * @author          ankit-wadhwa
 * @copyright       Copyright (c) 2013
 * @license         http://www.plantyourtree.com
 * @link            http://www.plantyourtree.com
 * @filesource
 */

// ---------------------------------------------------------------------------

/**
 * Admin_Controller
 *
 * Extends the Site_Controller class so I can declare special Admin controllers
 *
 * @package       	BackendPropbizz
 * @subpackage      Controllers
 */
class Front_Controller extends My_Controller
{
	
	 function Front_Controller()
	 {		
		  parent::My_Controller();
		  
		  $this->_site_root_dir = $this->config->item("DIR_ROOT_IMAGE") ;
		  $this->_site_host_image = $this->config->item("SITE_ROOT_IMAGE");
		  $this->_main_container = $this->config->item("tree_template") . "front_container.php";
		  $this->_about_container = $this->config->item("tree_template") . "about_container.php";
		  $this->_locks_container = $this->config->item("tree_template") . "locks_container.php";
		  $this->_lockers_container = $this->config->item("tree_template") . "lockers_container.php";
		  $this->_safe_container = $this->config->item("tree_template") . "safe_container.php";
		  $this->_features_container = $this->config->item("tree_template") . "feature_container.php";
		  $this->_information_container = $this->config->item("tree_template") . "information_container.php";
		  $this->_contactus_container = $this->config->item("tree_template") . "contactus_container.php";
          $this->_rentalrate_container = $this->config->item("tree_template") . "rentalrate_container.php";
		  $this->_typeofsafe_container = $this->config->item("tree_template") . "typeofsafe_container.php";
		  $this->_aboutsafe_container = $this->config->item("tree_template") . "aboutsafe_container.php";
		  $this->_gallery_container = $this->config->item("tree_template") . "gallery_container.php";
		  $this->_wslist_container = $this->config->item("tree_template") . "wslist_container.php";
		  
		  $this->_reg_form_container = $this->config->item("tree_template") . "reg_form_container.php";
		  $this->_reg_conf_form_container = $this->config->item("tree_template") . "reg_conf_form_container.php";	
		  	  
		  $this->_login_form_container = $this->config->item("tree_template") . "login_form_container.php";
		  $this->_forget_form_container = $this->config->item("tree_template") . "forget_form_container.php";
		  $this->_resume_form_container = $this->config->item("tree_template") . "resume_form_container.php";
		  $this->_letter_form_container = $this->config->item("tree_template") . "letter_form_container.php";
		  $this->_profile_form_container = $this->config->item("tree_template") . "profile_form_container.php";
		  $this->_profile_img_form_container = $this->config->item("tree_template") . "profile_img_form_container.php";
		  $this->_newpass_form_container = $this->config->item("tree_template") . "newpass_form_container.php";
		  //$this->_confsn_comment_form_container = $this->config->item("tree_template") . "confsn_comment_form_container.php";		          
		  $this->_selfie_img_form_container = $this->config->item("tree_template") . "selfie_form_container.php";
		  
		  $this->_front_form_container = $this->config->item("tree_template") . "front_form_container.php";
		  
		
	      $this->load->model("catalog/home_management","MFHOMEM"); ## Define Home Model
		  $this->load->model("catalog/confession_management","CONFM"); ## Define Connfession Model
		  $this->load->model("catalog/image_management","MIMG"); ## Define Image Model
		  $this->load->model("catalog/user_management","USRMN"); ## Define Image Model
		  $this->load->model("catalog/task_management","TSKM"); ## Define Image Model
		  


		  $this->load->model("catalog/pro_management","PROMG"); ## Do not use for Basic version.........
		  


				 if( is_dir("install"))
		  {
			 flashMsg("warning",$this->lang->line("ravpro_remove_install"));
		  }
			 log_message("debug","RavPro : Admin_Controller class loaded");
	 }
	 
	function checkloginsession()
		{
			if(!($this->session->userdata("customer_login_id"))){
			redirect("catalog/index");
			 }
			
		}
		function checklogoutsession()
		{
			if($this->session->userdata("customer_login_id")){
			redirect("catalog/deshboard/deshboard/welcome"); 
			 }
			
		}
}
/* End of Admin_controller.php */
/* Location: ./system/application/libraries/Admin_controller.php */
