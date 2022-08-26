<?php
/**
 * @name		CodeIgniter Advanced Images
 * @author		Niraj kumar singh
 * @link		http://webappmate.com
 * @license		null
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * Image
 *
 * Generates a modified image source to work with the advanced images controller
 *
 * @access	public
 * @param	mixed
 * @return	string
 */
if (!function_exists('image')) {
	 
    function image($image_array=array(), $preset) {
		// cheking image 
		if(!file_exists($image_array['base_image_path'])){
			$base_url = $image_array['NoImageBaseUrl'];
			$image_path =   $image_array['no_image_path'];
			
		}else{
			$base_url = $image_array['BaseUrl'];
			$image_path =   $image_array['base_image_path'];
		}
		//print_r($image_array);die;
		$ci = &get_instance();
        // load the allowed image presets
        $ci->load->config("images");
        $sizes = $ci->config->item("image_sizes");
        if(! is_array($preset)){
			$image_size_array =(!empty($sizes[$preset]))?$sizes[$preset]:array(550,500);
		}else{
			$image_size_array =$preset;
		}
        $pathinfo = pathinfo($image_path);
        $new_path = $image_path; 
        // check if requested preset exists
        if (!empty($image_size_array)) {
            $new_path = $pathinfo["dirname"] . "/" . $pathinfo["filename"] . "-" . implode("x", $image_size_array) .'.'. $pathinfo["extension"];
            $thumb_file_name = $pathinfo["dirname"] . "/" . $pathinfo["filename"] . "-" . implode("x", $image_size_array) .'_thumb.'. $pathinfo["extension"];
            $return_image = $base_url. "/" . $pathinfo["filename"] . "-" . implode("x", $image_size_array) .'_thumb.'. $pathinfo["extension"];
        }
        
        if(!file_exists($thumb_file_name)){
			$config['image_library'] = 'gd2';
			$config['source_image'] = $image_path;
			$config['create_thumb'] = TRUE;
			$config['new_image'] = $new_path;
			$config['maintain_ratio'] = TRUE;
			$config['width']         = (!empty($image_size_array[0]))?$image_size_array[0]:'150';
			$config['height']       = (!empty($image_size_array[1]))?$image_size_array[1]:'150';
			
			$ci->load->library('image_lib');
			$ci->image_lib->initialize($config);
			$ci->image_lib->resize();
			$ci->image_lib->clear();
		}
        return $return_image;
    }
}
if (!function_exists('image_decode')) {
	 
    function image_decode($image_array=array(), $preset) {
		// cheking image 		
		$image =image($image_array, $preset);		 
		$type = pathinfo($image, PATHINFO_EXTENSION);
		$data = file_get_contents($image);
		return $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
    }
}
