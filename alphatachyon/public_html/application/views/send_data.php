<?php 
	$this->load->view('common/header'); 
	$this->load->view('common/nav');   
?>
<!-- Content start Here -->
<section class="rowContent">
<div class="container">
    <div class="innerRowBox">
	 <div class="createUserBox">
	   <div class="dashboardStatus-outer">
	    <div class="dashboardStatus-innerscroll">
	    <div class="dashboardStatus">
		<div class="dashboardStatusInner">
		<form action="<?php echo base_url(); ?>auth_admin/send_data" method="POST" id="send_data">
		 <div class="boardBox-row-a">
			  <div class="col-sm-2 col-md-2 col-lg-2 col-xs-2">
                <strong>Board:</strong>
			  </div>
			<div class="col-sm-2 col-md-4 col-lg-4 col-xs-4">
               <strong>Select Type :</strong>
			   <select id="type" name="type">
					<?php foreach($item_category as $cat): ?>
						<option value="<?php echo $cat->id;?>"><?php echo $cat->cat_name;?></option>
					<?php endforeach;?>
				</select>
			</div>
			
			<div class="col-sm-2 col-md-6 col-lg-6 hidden-xs">&nbsp;</div>
		 
		 </div>
		 
		 <div class="boardBox-row-b">
		   <div class="col-sm-2 col-md-2 col-lg-2 col-xs-2 testboard">
		     <?php foreach($user_board as $key => $value): ?>
		     <span>
			    <input type="checkbox" value="<?php echo $key; ?>" id="<?php echo $key; ?>" class="board">
				<label>&nbsp;<?php echo $value; ?></label>
			 </span>
			 <?php endforeach;?>

		   </div>
		   
		   <div class="col-sm-10 col-md-10 col-lg-10 col-xs-10">
		    <div class="row">
		     <div class="col-sm-3 col-md-3 col-lg-3 col-xs-3">
			 <strong>English Name :</strong>
			 <select id="eng_item_name" name="eng_item_name" style="width:130px;">
				<?php foreach($item_data as $item): ?>
					<option value="<?php echo $item->eng_item_name;?>" dataid="<?php echo $item->id;?>"><?php echo $item->eng_item_name;?></option>
				<?php endforeach;?>
			</select>
             </div>
			
             <div class="col-sm-2 col-md-2 col-lg-2 col-xs-2">
			   <strong>Hindi Name :</strong><br/>
                <select id="hindi_item_name" name="hindi_item_name">
				<?php foreach($item_data as $item): ?>
					<option value="<?php echo $item->hindi_item_name;?>"><?php echo $item->hindi_item_name;?></option>
				<?php endforeach;?>
			</select> 
			 </div>	

              <div class="col-sm-2 col-md-2 col-lg-2 col-xs-2">
			    <strong>Tonnes :</strong> <br/>         
                <input type="text" class="inputtx" id="tonnes" value="0" name="tonnes" maxlength="7">
        	  </div>
			  
			  <div class="col-sm-2 col-md-2 col-lg-2 col-xs-2">
			   <strong style="">Min Rates:</strong> <br/>          
               <input type="text" value="0" maxlength="6" id="min_rate" name="min_rate" class="inputtx">
              </div>
			  
			  <div class="col-sm-2 col-md-2 col-lg-2 col-xs-2">
		      <strong>Max Rates:</strong><br/>
              <input type="text" value="0" class="inputtx" id="max_rate" name="max_rate" maxlength="6">
     		  </div>
			 
			 <div class="col-sm-1 col-md-1 col-lg-1 col-xs-1">
			  <div class="row">
			  <strong>&nbsp;</strong><br/>
			  <input type="submit" id="add_items" class="additem-s" value="Add Items">
	   	     </div>
			</div>
			 
		   </div>
		  </div>
		 </div>
		 </form>
		 <div class="thriceButton">
		 	<input type="submit" value="Set Board" id="set_board">
		 	<input type="submit" value="Reset Board" id="reset_board">
		 	
		 	<form action="<?php echo base_url(); ?>auth_admin/update_data" method="POST">
			<span id="boardIds"></span>
		   		<input type="submit" value="Update Data" id="update">
			</form>
		 </div>
		</div>
	     </div>
	   <div class="error alert alert-danger text-center" style="display:none; margin-bottom:15px;">
	   <strong style="text-align:center;display:block;"></strong>
	   </div>
	   <?php if($this->session->flashdata('success_msg') != ''){ ?>
		    <div class="success alert alert-success text-center" style="margin-bottom:15px;">
	          <strong><?php echo $this->session->flashdata('success_msg');?></strong>
	        </div>
	    <?php } ?>
	    <?php if($this->session->flashdata('error_msg') != ''){ ?>
		     <div class="error alert alert-danger text-center" style="margin-bottom:15px;">
	          <strong><?php echo $this->session->flashdata('error_msg');?></strong>
	        </div>
	    <?php } ?>
	   <table class="comuditySendData">
    	  <tr>
            <td rowspan="3" align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                
            <td rowspan="3" align="center">
                S.No.
            </td>
			<td colspan="2" align="center" rowspan="2">
                Commodities       
			</td>
			<td align="center">
			Arrival of
			</td>
            <td colspan="2" align="center">
                Price per Kg. (in Rs.)
			</td>
        </tr>
        <tr>
            <td align="center">
                previous day
			</td>
            <td colspan="2" align="center">
                Today's
			</td>
        </tr>
        <tr>
            <td align="center">
                English
			</td>
            <td align="center">
                Hindi
			 </td>
            <td align="center">
                (In Tonnes)
			 </td>
            <td align="center">
                Mini Rates
			</td>
            <td align="center">
                Maxi Rates
			</td>
        </tr>
    </table>
	
	 <table cellspacing="0" cellpadding="4" width="100%" id="item-list">
		<?php $i=1; 
		if(count($item_list) > 0){
			foreach($item_list as $item): ?>
			  <?php $background = ($i % 2==0) ? "white" : "#E3EAEB"; ?>
			  <tr style="background-color:<?php echo $background;?>; font-weight: bold;">
				<td align="center" style="width:10px;">
					<a onclick='confirmDelete();' href='<?php echo base_url(); ?>auth_admin/delete_item_list/<?php echo $item->id;?>' style="color:#333333;">Delete</a>
				</td>
				<td align="center" style="width:30px;"><?php echo $i; ?></td>
				<td align="center" style="width:111px;"><?php echo $item->eng_item_name; ?></td>
	<td align="left" style="font-family:AngsanaUPC;font-size:16pt;width:108px;"><?php echo $item->hindi_item_name; ?></td>
				<td align="left" style="width:117px;"><?php echo $item->tonnes; ?></td>
				<td align="left" style="width:86px;"><?php echo $item->tonnes; ?></td>
				<td align="center" style="width:90px;"><?php echo $item->max_rate; ?></td>
			  </tr>
			<?php $i++; endforeach; 
		}else{ ?>
		<tr></tr>
		<?php } ?>
    </table>
    <input type="hidden" id="sno" value="<?php echo $i-1; ?>">
 
        </div> </div>
	   </div>
	</div>	
</div>
</section>
<!-- Content End Here -->

<?php $this->load->view('common/footer'); ?>

<script type="text/javascript">

$(document).ready(function(){
	var type = $("#type option:selected" ).val();
	getItem(type);
	function getItem(type){
		$.ajax({
		    url: '<?=base_url()?>auth_admin/get_item',
		    type: 'post',
		    dataType: 'json',
		    data: 'type='+type,
		    success: function(response){
		    	if(response){
		    	   var eng_item = '';
			       var hind_item = '';
		           $.each(response,function(i,o){
			           eng_item += '<option value="'+o.id+'" engName="'+o.eng_item_name+'" hindName="'+o.hindi_item_name+'">'+o.eng_item_name+'</option>';
			           hind_item += '<option value="'+o.hindi_item_name+'">'+o.hindi_item_name+'</option>';
			        });
			        $('#eng_item_name').find('option').remove().end().append(eng_item);
			        $('#hindi_item_name').find('option').remove().end().append(hind_item);
		    	}
		    }
	  	});
	}
	$('#type').on('change',function(){
	   var type = this.value;
	   getItem(type);
	})
	$('#eng_item_name').on('change',function(){
		var element = $(this).find('option:selected'); 
        var hinName = element.attr("hindname");
        $('#hindi_item_name option').removeAttr('selected');
        $('#hindi_item_name').find('option[value="'+hinName+'"]').attr("selected", "selected");
	})

	$('#update').prop('disabled', true);
	$('#add_items').prop('disabled', true);
	$("#set_board").click(function(){
	 	var checkedIds = $(".board:checked").map(function() {
	 		$('#'+this.id).prop('disabled', true);
	    	return this.id;
	  	}).toArray();
  		var boardIds = checkedIds.join(",");
  		if(checkedIds.length > 0){
  			$("#boardIds").text(boardIds);
  			$('#update').prop('disabled', false);
  			$('#add_items').prop('disabled', false);
  		}
  		
	});
	$("#reset_board").click(function(){
		window.location.href='<?php echo base_url('auth_admin/send_data');?>';
	});

	//Validation start//
	$('#send_data').submit(function() {
	    var flag = false;
	    if ($("#tonnes").val() <= 0) {
	      $(".error").show();
	      $(".error strong").html('Tonnes value entered should be greater than 0.00');
	      flag = false;
	    }else if ($("#min_rate").val() <= 0) {
	      $(".error").show();
	      $(".error strong").html('Minimum Rate value entered should be greater than 0.00');
	      flag = false;
	    }else if ($("#max_rate").val() <= 0) {
	      $(".error").show();
	      $(".error strong").html('Maximum Rate value entered should be greater than 0.00');
	      flag = false;
	    }
	    else if (parseInt($("#min_rate").val()) > parseInt($("#max_rate").val())) {
	      $(".error").show();
	      $(".error strong").html('Maximum Rate value entered should be greater or equal to Minimum Rate');
	      flag = false;
	    }else{
			$(".error").hide();
	    	var tonnes = $('#tonnes').val();
	    	var min_rate = $('#min_rate').val();
	    	var max_rate = $('#max_rate').val();
	    	var itemId = $('#eng_item_name').val();
	    	var boardId = $('#boardIds').text();
	    	var engItemName = $("#eng_item_name option:selected").attr("engname");
	    	var hindItemName = $("#eng_item_name option:selected").attr("hindname");
	    	var sno = parseInt($("#sno").val()) + 1;
	    	$.ajax({
			    url: '<?=base_url()?>auth_admin/add_item_list',
			    type: 'post',
			    data: 'itemId='+itemId+'&boardId='+boardId+'&tonnes='+tonnes+'&min_rate='+min_rate+'&max_rate='+max_rate,
			    success: function(response){
			    	if(response){
			    		$("#sno").val(sno);
			    		var background = (sno % 2==0) ? "white" : "#E3EAEB";
			    		var tr = "<tr align='center' style='background-color:"+background+";'>";
					    tr += "<td style='width:10px;'><a onclick='confirmDelete();' href='<?php echo base_url(); ?>auth_admin/delete_item_list/"+response+"' style='color:#333333;'>Delete</a></td>";
					    tr += "<td style='width:30px;'>"+sno+"</td>";
					    tr += "<td style='width:111px;'>"+engItemName+"</td>";
					    tr += "<td align='left' style='font-family:AngsanaUPC;font-size:16pt;width:108px;'>"+hindItemName+"</td>";
					    tr += "<td align='left' style='width:117px;'>"+tonnes+"</td>";
					    tr += "<td align='left' style='width:86px;'>"+min_rate+"</td>";
					    tr += "<td style='width:90px;'>"+max_rate+"</td>";
					    tr += "</tr>";
					    $('#item-list tbody').append(tr);
			    	}
			    }
		  	});
	    
	    }
	    return flag;
	});

});

$("#button").click(function(){
 window.location.href='<?php echo base_url('auth_admin/update_data');?>';
});
function confirmDelete() {
  return confirm('Are you sure you want to delete this record?');
}
</script>