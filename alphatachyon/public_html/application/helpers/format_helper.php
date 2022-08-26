<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('DateFormat')){
	function DateFormat($dateTime=null)
	{
		$date='N/A';
		if(!empty($dateTime)){
			return date('d-m-y H:i:s',strtotime($dateTime));
		}
		return $date;
	}
	function pr($data=array()){
		if(!empty($data)){
			echo "<pre>"; print_r($data);
			echo "</pre>>";
		}
		 
	}
}
