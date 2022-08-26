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
 *  MY_Controller
 *
 * Extends the default CI Controller class so I can declare special site controllers.
 * Also loads the Ravpro library since if this class is part of the plantyourtree system
 *
 * @package         plantyourtree
 * @subpackage      Controllers
 */
class MY_Controller extends CI_Controller 
{

 function My_Controller()
 {

  parent::__construct();
  // Load Base CodeIgniter files
  $this->load->database();
 
// load "form" library
 $this->load->library("email");			 // load "email" class
 $this->load->library("form_validation");// load "form_validation" class
 $this->load->library("session");		 // load "session" class
 $this->load->library("parser");         // load "parser" class
 $this->load->library("encrypt");		 // load "encrypt" class
 $this->load->library("pagination");		 // load "encrypt" class
 $this->load->library('app/paginationlib');
 //$this->load->library('image');
 //$this->load->library("encrypt");		 // load "encrypt" class
  //Start helper 
  $this->load->helper("url");            // load "url"  helper class
  $this->load->helper("html");           // load "html" helper  class
  $this->load->helper("form");           // load "form" helper  class
  $this->load->helper("email");          // load "email" helper class
  $this->load->helper("download");       // load "download" helper class
  $this->load->helper("array"); 
 $this->load->helper("ckeditor_helper"); 

  // Load Base Prop files
  
   $this->load->config("prop");

  
 }


}


/* End of file MY_Controller.php */
/* Location: ./system/application/libraries/MY_Controller.php */