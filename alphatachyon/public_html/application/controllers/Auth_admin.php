<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/libraries/Auth_Controller.php';
#################################################
		# Controller name: Auth_admin
		# purpose        : Admin contorller
		# created on     : 29 Sept 2016
		# website url    : Webeappmate.com
		# Author         : Niraj kumar
		# Email          : niraj@webappmate.com
		
####################################################
class Auth_admin extends Auth_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Auth_admin_model');
        $this->load->library(array('form_validation','session','pagination'));
        $this->load->helper(array('form', 'url','file','html'));
    }
    
    #################################################
		# Function name  : index
		# purpose        : this page is used for login or dashboard
		# created on     : 5 June 2018
		# website url    : Webeappmate.com
    	# Created By     : Priyanka Gupta
	###################################################

	public function index()
	{ 
		$this->load->view('login');
	}

	#################################################
		# Function name  : Login
		# purpose        : User login
		# created on     : 5 June 2018
		# website url    : Webeappmate.com
		# Created By     : Priyanka Gupta
	####################################################
	 
	public function login(){	
		if(!empty($_POST)){ 
			$this->form_validation->set_rules('name', 'Login Id', 'trim|required');
			$this->form_validation->set_rules('password', 'Password', 'trim|required');
			$test =$this->form_validation->run();
			if ($this->form_validation->run() == FALSE){
				$errors = $this->form_validation->error_array();
				$message = [
				'status' => 0,
				'message' => $errors];	 
			}else{
				$login_status = $this->Auth_admin_model->check_api_login(); 
				if(!empty($login_status)){
					$message = [
					'status' => 1,
					'message' => '',
					];
				}else{
					$message = [
					'status' => 0,
					'message' => 'Login Id or password is wrong'];
				}
				 
			}				 
			echo  json_encode($message);
		}
	}

	public function dashboard(){
		$this->checkloginsession();
		$this->load->view('dashboard');  
    }
    public function logout() {
	    $this->session->unset_userdata('logged_in');
	    redirect(base_url('auth_admin'));
    }

    #################################################
		# Function name  : user_add,get_user_data,user_edit,delete_user
		# purpose        : This is used for add, edit, delete and get user detail
		# created on     : 6 June 2018
		# website url    : Webeappmate.com	
    	# Created By     : Priyanka Gupta
	 ####################################################
     
    public function get_user_data(){
     	$user_type = $this->input->post('user_type');
     	$users = $this->Auth_admin_model->get_user_data($user_type);
     	echo  json_encode($users);
    }

	public function user_add(){
		$this->checkloginsession();
		$data['items_board'] = $this->Auth_admin_model->getAllBoardItem();
    	if($this->input->post('submit') == 'SAVE'){
			$status = $this->Auth_admin_model->save_user();
			if($status == '1'){
				$this->session->set_flashdata('success_msg', 'New User Details has been created successfully.');
			}else{
				$this->session->set_flashdata('error_msg', 'New User Details has not been created successfully.');
			}
			redirect('auth_admin/user_add',$data);
		}
		$this->load->view('User/user_add',$data);
	}
	public function user_edit(){
		$this->checkloginsession();
		$id = $this->uri->segment('3');
		$data['items_board'] = $this->Auth_admin_model->getAllBoardItem();
		$data['user_detail'] = $this->Auth_admin_model->get_user_detail($id);
		if($this->input->post('submit') == 'SAVE'){
			$status = $this->Auth_admin_model->update_user($id);
			if($status == '1'){
				$this->session->set_flashdata('success_msg', 'User updated successfully.');
			}else{
				$this->session->set_flashdata('error_msg', 'User not updated successfully.');
			}
			redirect('auth_admin/user_add',$data);
		}
       	$this->load->view('User/user_edit',$data);
	}
	public function delete_user($user_id) {
	    $status = $this->Auth_admin_model->user_delete_row($user_id);
		$this->session->set_flashdata('success_msg', 'User deleted successfully.!');
	    redirect('auth_admin/user_add');
    }
	
	#################################################
		# Function name  : commodity_type,delete_commodity_type,update_commodity_type,ajax_commodity_type
		# purpose        : This is used for add,edit,delete and ajax pagination Commodity Type
		# created on     : 6 June 2018
		# website url    : Webeappmate.com	
    	# Created By     : Priyanka Gupta
	####################################################

	public function commodity_type() {
	    $this->checkloginsession();
	    if($this->input->post('submit') == 'SAVE'){
			$status = $this->Auth_admin_model->save_category_item();
			if($status == '1'){
				$this->session->set_flashdata('success_msg', 'Commodity Type has been created successfully.');
			}else{
				$this->session->set_flashdata('error_msg', 'Commodity Type has not been created successfully.');
			}
			redirect('auth_admin/commodity_type');
		}
	    $this->load->view('commodity_type'); 
    }

    public function delete_commodity_type($user_id) {
	    $status = $this->Auth_admin_model->delete_commodity_type($user_id);
		if($status == '1'){
			$this->session->set_flashdata('success_msg', 'Commodity Type has been deleted successfully.!');
		}
	    redirect('auth_admin/commodity_type');
    }

    public function update_commodity_type() {
	    $status = $this->Auth_admin_model->update_commodity_type();
		echo $status;
    }

    public function ajax_commodity_type($rowno=0){
        // Row per page
        $rowperpage = 25;
        // Row position
        if($rowno != 0){
            $rowno = ($rowno-1) * $rowperpage;
        }
        // All records count
        $allcount = $this->Auth_admin_model->getCategoryItemCount();
        // Get  records
        $users_record = $this->Auth_admin_model->getCategoryItem($rowno,$rowperpage);
        
        // Pagination Configuration
        $config['base_url'] = base_url().'auth_admin/ajax_commodity_type';
        $config['use_page_numbers'] = TRUE;
        $config['total_rows'] = $allcount;
        $config['per_page'] = $rowperpage;
        // Initialize
        $this->pagination->initialize($config);
        // Initialize $data Array
        $data['pagination'] = $this->pagination->create_links();
        $data['result'] = $users_record;
        $data['row'] = $rowno;

        echo json_encode($data);
        
    }

	#################################################
		# Function name  : commodity,delete_commodity,update_commodity,ajax_commodity
		# purpose        : This is used for add,update,delete and pagination ajax Commodity
		# created on     : 6 June 2018
		# website url    : Webeappmate.com	
    	# Created By     : Priyanka Gupta
	####################################################

	public function commodity() {
	    $this->checkloginsession();
	    $data['category'] = $this->Auth_admin_model->get_item_category_data();
	    if($this->input->post('submit') == 'SAVE'){
			$status = $this->Auth_admin_model->save_commodity();
			if($status == '1'){
				$this->session->set_flashdata('success_msg', 'Commodity has been created successfully.');
			}else{
				$this->session->set_flashdata('error_msg', 'Commodity has not been created successfully.');
			}
			redirect('auth_admin/commodity');
		}
	    $this->load->view('commodity',$data);
    }

    public function update_commodity() {
	    $status = $this->Auth_admin_model->update_commodity();
		echo $status;
    }

    public function delete_commodity($user_id) {
	    $status = $this->Auth_admin_model->delete_commodity($user_id);
		if($status == '1'){
			$this->session->set_flashdata('success_msg', 'Commodity has been deleted successfully.!');
		}
	    redirect('auth_admin/commodity');
    }

    public function ajax_commodity($rowno=0){
        // Row per page
        $rowperpage = 25;
        // Row position
        if($rowno != 0){
            $rowno = ($rowno-1) * $rowperpage;
        }
        // All records count
        $allcount = $this->Auth_admin_model->getCommodityCount();
        // Get  records
        $users_record = $this->Auth_admin_model->getCommodity($rowno,$rowperpage);
        
        // Pagination Configuration
        $config['base_url'] = base_url().'auth_admin/ajax_commodity';
        $config['use_page_numbers'] = TRUE;
        $config['total_rows'] = $allcount;
        $config['per_page'] = $rowperpage;
        // Initialize
        $this->pagination->initialize($config);
        // Initialize $data Array
        $data['pagination'] = $this->pagination->create_links();
        $data['result'] = $users_record;
        $data['row'] = $rowno;

        echo json_encode($data);
        
    }
    
    #################################################
		# Function name  : send_data,get_item,delete_item_list,add_item_list,update_data
		# purpose        : This is used for add item detail get item detail and after that send data to server in .txt file 
		# created on     : 12 June 2018
		# website url    : Webeappmate.com	
    	# Created By     : Priyanka Gupta
	####################################################

	public function send_data() {
	    $this->checkloginsession();
	    $user = $this->session->userdata('logged_in'); 
	    $data['user_board'] = $this->Auth_admin_model->getUserBoard($user['id']);
	    $data['item_category'] = $this->Auth_admin_model->get_item_category_data();
	    $data['item_list'] = $this->Auth_admin_model->get_item_list();
	    $this->load->view('send_data',$data);
    }

    function get_item(){
    	$cat_id = $this->input->post('type');
    	$item = $this->Auth_admin_model->get_master_item_data($cat_id);
    	echo json_encode($item);
    }

    function delete_item_list($item_id){
    	$status = $this->Auth_admin_model->delete_item_list($item_id);
		if($status == '1'){
			$this->session->set_flashdata('success_msg', 'Item has been deleted successfully.!');
		}
	    redirect('auth_admin/send_data');
    }

    function add_item_list(){
    	$lastInsertId = $this->Auth_admin_model->add_item_list();
    	echo $lastInsertId;
    }

    public function update_data(){
	    $data['item_data'] = $this->Auth_admin_model->get_item_list();
	    if(count($data['item_data']) > 0){
		    $text = '$';
		    $itemId = '';
		    foreach($data['item_data'] as $res){
		    	$boardIds = $res->board_ids;
		    	$text .= $res->eng_item_name. "\t";
		    	$text .= $res->hindi_item_name."\t";
		    	$text .= $res->tonnes."\t";
		    	$text .= $res->min_rate."\t";
		    	$text .= $res->max_rate."\t";
		    	$itemId .= $res->id.',';
		    }
		    $text .= '$';
		    $boardId = explode(',',$boardIds);
		    $messageStatus = array();
		    foreach($boardId as $res){
		    	$boardId = $res;
		    	$message = $this->Auth_admin_model->getScrollingMessage($res);
		    	$board_name = $this->Auth_admin_model->getBoardName($res); 
		    	$EngMessage = $message[0]['scroll_message'];
		    	$HindMessage = $message[1]['scroll_message'];
		    	if(!empty($EngMessage) & !empty($HindMessage)){
		    		$messageStatus['Status'][] = 1; 
		    		$text1.$res  = $EngMessage.'$';
				    $text1.$res .= $HindMessage;
				    $text1.$res .= '$';
				    $text2 = $text.$text1.$res;
				    $filename = $message[0]['board_name'].'.txt';
				    if (!write_file($filename, $text2))
				    {
				    	$messageStatus['FileStatus'] = '0';
				    }
				    else
				    {
				    	$messageStatus['FileStatus'] = '1';
				    	$this->Auth_admin_model->update_board_send_status($boardId);
				    }
		    	}else{
		    		$messageStatus['Status'][] = 0; 
		    		$messageStatus['Board'][] = $board_name; 
		    	}
		    }
		    if(in_array(0, $messageStatus['Status'])) { 
		    	$boardName = implode(',',$messageStatus['Board']);
			    $this->session->set_flashdata('error_msg', 'Please add scrooling message of '.$boardName.' Board.');
			    redirect('auth_admin/send_data');
			}else{
				if(in_array(0, $messageStatus['FileStatus'])) { 
					$this->session->set_flashdata('error_msg', 'File has not been send to server!');
				}else{
					$this->Auth_admin_model->update_item_list($itemId); 
					$this->session->set_flashdata('success_msg', 'File has been send to server successfully!');
				}	
				redirect('auth_admin/send_data');
			}
		    
		}else{
			$this->session->set_flashdata('error_msg', 'Please add item in list.!');
			redirect('auth_admin/send_data');
		}
    }

    #################################################
		# Function name  : board_status
		# purpose        : This is used for get board status
		# created on     : 18 June 2018
		# website url    : Webeappmate.com	
    	# Created By     : Priyanka Gupta
	####################################################

    function board_status(){
    	$this->checkloginsession();
    	$data['board_status'] = $this->Auth_admin_model->board_status();
    	$this->load->view('board_status',$data);
    }

    #################################################
		# Function name  : change_password
		# purpose        : This is used for change user password
		# created on     : 18 June 2018
		# website url    : Webeappmate.com	
    	# Created By     : Priyanka Gupta
	####################################################

    function change_password(){
    	$this->checkloginsession();
    	if($this->input->post('update') == 'Update'){
    		$old_pass = $this->Auth_admin_model->get_old_password();
    		if($old_pass->p_key != $this->input->post('old_password')){
    			$this->session->set_flashdata('msg', 'Invalid Old Password');
    		}else{
    			$status = $this->Auth_admin_model->update_password();
    			if($status == '1'){
    				$this->session->set_flashdata('msg', 'Successfully Updated');
    			}
    		}
    	}
    	$this->load->view('change_password');
    }

    #################################################
		# Function name  : message_master,add_message_master,edit_message_master,delete_message_master
		# purpose        : This is used for add,edit,delete and get scrolling message detail in hindi and language both
		# created on     : 18 June 2018
		# website url    : Webeappmate.com	
    	# Created By     : Priyanka Gupta
	####################################################

    function message_master(){	
    	$data['board_message'] = $this->Auth_admin_model->get_board_message();
    	$this->load->view('message_master',$data);
    }

    function add_message_master(){
    	$user = $this->session->userdata('logged_in'); 
	    $data['user_board'] = $this->Auth_admin_model->getUserBoard($user['id']);
	    if($this->input->post('save') == 'SAVE'){
	    	$status = $this->Auth_admin_model->add_message_master();
	    	if($status == 0){
	    		$lan = $this->input->post('language') == '0' ? 'English' : 'Hindi';
	    		$this->session->set_flashdata('error_msg','Board '.$lan.' Message already exist.');
	    	}
			redirect('auth_admin/message_master');
	    }	
    	$this->load->view('add_message_master',$data);
    }

    function edit_message_master(){
    	$user = $this->session->userdata('logged_in'); 
    	$boardMessageId = $this->uri->segment(3); 
	    $data['user_board'] = $this->Auth_admin_model->getUserBoard($user['id']);
	    $data['message_detail'] = $this->Auth_admin_model->message_master_detail($boardMessageId);
	    if($this->input->post('save') == 'SAVE'){
	    	$this->Auth_admin_model->update_message_master($boardMessageId);
			redirect('auth_admin/message_master');
	    }	
    	$this->load->view('edit_message_master',$data);
    }

    function delete_message_master($boardMessageId){
    	$status = $this->Auth_admin_model->delete_message_master($boardMessageId);
	    redirect('auth_admin/message_master');
    }

    #################################################
		# Function name  : board_master,edit_board_master,delete_master_board
		# purpose        : This is used for add,edit,delete and get boards
		# created on     : 18 June 2018
		# website url    : Webeappmate.com	
    	# Created By     : Priyanka Gupta
	####################################################

    function board_master(){
    	$this->checkloginsession();
    	$data['board_master'] = $this->Auth_admin_model->board_status();
    	if($this->input->post('save') == 'Save'){
    	    $existStatus = $this->Auth_admin_model->check_board_exist();
    	    if($existStatus == '1'){
    	    	$this->session->set_flashdata('error_msg', 'This Board is here already.');
    	    }
    	    else{
    	    	$status = $this->Auth_admin_model->add_board_master();
		    	if($status == '1'){
		    		$this->session->set_flashdata('success_msg','Successfully Inserted.');
		    	}
    	    }
			redirect('auth_admin/board_master');
	    }
    	$this->load->view('board_master',$data);
    }

    function edit_board_master(){
    	$this->checkloginsession();
    	$data['board_master'] = $this->Auth_admin_model->board_status();
    	$data['board_detail'] = $this->Auth_admin_model->board_detail();
    	if($this->input->post('save') == 'Save'){
    	    $existStatus = $this->Auth_admin_model->check_board_exist();
    	    if($existStatus == '1'){
    	    	$this->session->set_flashdata('error_msg', 'This Board is here already.');
    	    }
    	    else{
    	    	$status = $this->Auth_admin_model->edit_board_master();
		    	if($status == '1'){
		    		$this->session->set_flashdata('success_msg','Successfully Updated.');
		    	}
    	    }
			redirect('auth_admin/board_master');
	    }
    	$this->load->view('edit_board_master',$data);
    }

    function delete_master_board($boardId){
    	$status = $this->Auth_admin_model->delete_master_board($boardId);
    	if($status == 1){
    		$this->session->set_flashdata('success_msg','Successfully Deleted.');
    	}
	    redirect('auth_admin/board_master');
    }

}
