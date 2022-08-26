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
class Deshboard_Controller extends My_Controller
{
	
	 function Deshboard_Controller()
	 {
		
		parent::My_Controller();
		   
		$this->_admin_container = $this->config->item("tree_template_dashboard") . "deshboard_container.php";
		$this->_resume_container = $this->config->item("tree_template") . "resume/list.php";
		
		$this->_login_container = $this->config->item("prop_template_admin") . "login.php";
		$this->_site_root_dir = $this->config->item("DIR_ROOT_IMAGE") ;
		$this->_site_host_image = $this->config->item("SITE_ROOT_IMAGE");
		
		
		
		$this->load->model("catalog/megha_menu","MM"); ## Define Login Model
		$this->load->model("catalog/certificates_types","CT"); ## Define Model certificates_types
		$this->load->model("catalog/upcoming_events","UCE"); ## Define Model manage_video_gallery
		$this->load->model("catalog/info_content","IC"); ## Define Model project_slider_management
		$this->load->model("catalog/manage_planting_partners","PP"); ## Define Model manage_planting_partners
		$this->load->model("catalog/manage_video_gallery","VG"); ## Define Model upcoming_events
		$this->load->model("catalog/project_managements","PMS"); ## Define Model project_managements
		$this->load->model("deshboard/manage_user","MFU"); ## Define Model project_managements
		$this->load->model("deshboard/all_type_location","ATL"); ## Define Model project_managements
		$this->load->model("deshboard/ajex_function_model","AJF"); ## Define ajex_function_model
		
		 
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
