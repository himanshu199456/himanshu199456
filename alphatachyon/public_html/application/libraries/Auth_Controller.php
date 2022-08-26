<?php if ( ! defined("BASEPATH")) exit("No direct script access allowed");
/**
 * Ravpro
 *
 * A website backend system for developers for PHP 4.3.2 or newer
 *
 * @package         plantyourtree
 * @author          Cyber Worx Technologies Private Limited
 * @copyright       Copyright (c) 2013
 * @filesource
 */

// ---------------------------------------------------------------------------

/**
 *  Auth_Controller
 *
 * Extends the default CI Controller class so I can declare special site controllers.
 * Also loads the Ravpro library since if this class is part of the plantyourtree system
 *
 * @package         plantyourtree
 * @subpackage      Controllers
 */
class Auth_Controller extends CI_Controller 
{

	function My_Controller(){
		parent::__construct();
		
	}

	function checkloginsession(){
		if(!($this->session->userdata("logged_in"))){
			redirect("auth_admin/");
		} 
	}
	function afterloginPage(){
		if($this->session->userdata("logged_in")){
			redirect("auth_admin/users");
		}
	}
	function checklogoutsession(){
		if($this->session->userdata("logged_in")){
			redirect("auth_admin/users");
		}else{
			redirect("auth_admin");
		}
	}
	public function error_array() {
		return $this->_error_array;
	} 
	function fileupload($image_data){
		$file_name= array();
			if(empty($image_data['file_name'])){
				 die( 'Please set file name');
			}
			if (!empty($_FILES[$image_data['file_name']]['name'])){			
			//$this->form_validation->set_rules('image', 'File', 'required');
			$config['upload_path']          = $image_data['upload_path'];
			$config['allowed_types']        = (!empty($image_data['allowed_types']))?$image_data['allowed_types']:'gif|jpg|png';
			$config['max_size']             = (!empty($image_data['max_size']))?$image_data['max_size']:100000;
			$config['max_width']            = (!empty($image_data['max_width']))?$image_data['max_size']:5000;
			$config['max_height']           = (!empty($image_data['max_height']))?$image_data['max_size']:5000;
			$this->load->library('upload');
			$this->upload->initialize($config);
			if (!file_exists($config['upload_path'])) {
				mkdir($config['upload_path'], 0777, true);
			}
			if ( ! $this->upload->do_upload($image_data['file_name'])){
				$file_name['error'] = $this->upload->display_errors();
				
			}else{
				$file_name = $this->upload->data();
				
			}				
		}
		return $file_name;
	}
	  
}



/* End of file MY_Controller.php */
/* Location: ./system/application/libraries/Auth_Controller.php */
