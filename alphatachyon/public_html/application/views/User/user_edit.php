<?php 
  $this->load->view('common/header'); 
  $this->load->view('common/nav');   
?>
<!-- Content start Here -->
<section class="rowContent">
<div class="container">
    <div class="innerRowBox">
   <?php //print_r($user_detail);?>
   <div class="createUserBox">
     <div class="userDetailBox">
        <form action="<?php echo base_url(); ?>auth_admin/user_edit/<?php echo $this->uri->segment('3'); ?>" method="POST" id="User_add" role="form">
        <h1>CREATE USER</h1>
        <ul>
          <li>
           <span>USER TYPE :</span>
           <select name="roll" id = "user_type" style="height:25px;width:155px;">
            <option <?php if(isset($user_detail) && !empty($user_detail->user_type) && $user_detail->user_type == 'Operator'){ echo "test";}?> value="3">OPERATOR</option>
            <option <?php if(isset($user_detail) && !empty($user_detail->user_type) && $user_detail->user_type == 'View/Edit'){ echo "selected";}?> value="2">VIEW/EDIT</option>
            <option <?php if(isset($user_detail) && !empty($user_detail->user_type) && $user_detail->user_type == 'admin'){ echo "selected";}?> value="1">ADMIN</option>
            </select>
          </li>
          <li>
            <span>USER ID :</span>
            <input name="user_name" id="user_id" type="text" class="uid" value="<?php if(isset($user_detail) && !empty($user_detail->user_name)){ echo strtoupper($user_detail->user_name);}?>">
          </li>
          <li>
            <span>PASSWORD :</span>
            <input name="password" id="password" type="password" class="uid" value="<?php if(isset($user_detail) && !empty($user_detail->p_key)){ echo $user_detail->p_key;}?>">
          </li>
          <li>
          <?php if(isset($user_detail) && !empty($user_detail->user_type)){
          	$board = explode(",",$user_detail->board_id);
          } ?>
          <span>SELECT BOARD :</span>
            <ul class="sublist">
              <?php foreach($items_board as $row) { ?>
                  <li>
                    <input name="board_id[]" type="checkbox" class="board" value="<?php echo $row->id;?>" <?php if(in_array($row->id, $board)){ echo "checked"; }?>>
                    <label><?php echo $row->board_name;?></label>    
                  </li>                       
              <?php } ?>
            </ul>
           </li>
           <li>
          <input type="submit" value="SAVE" name="submit">
          <button class="cancel">CANCEL</button>
          </li>
       </ul>
       </form>
      </div>
      <div class="error" style="diplay:none;">
        <span></span>
      </div>
      <?php if($this->session->flashdata('success_msg') != ''){ ?>
        <div class="error" style="diplay:none;">
          <span></span>
        </div>
      <?php } ?>

     <?php if($this->session->flashdata('error_msg') != ''){ ?>
        <div class="error">
          <span><?php echo $this->session->flashdata('error_msg');?></span>
        </div>
      <?php } ?>
      <?php if($this->session->flashdata('success_msg') != ''){ ?>
        <div class="success">
          <span><?php echo $this->session->flashdata('success_msg');?></span>
        </div>
      <?php } ?>

  
  <div class="scrollDiv">
    <table cellspacing="0" id="users" rules="rows" border="1" style="font-family:Verdana;font-size:11px;width:100%;border-collapse:collapse;">
      <tr align="center" style="color:White;background-color:#990000;font-weight:bold;font-style:normal;text-decoration:none;"> 
      </tr>
     </table>
     </div>
    </div>
  </div>  
</div>
</section>
<!-- Content End Here -->
<?php $this->load->view('common/footer'); ?>

<script>  
$(document).ready(function(){
  $("#user_id").keyup( function (e) {
    var str = $(this).val();
    $("#user_id").val(str.toUpperCase());
  });
  $('#User_add').submit(function() {
    var flag = true;
    if ($("#user_id").val().trim().length <= 0) {
      $(".error").show();
      $(".error span").html('Please enter User ID, It cannot be left blank.');
      flag = false;
    }else if($("#password").val().trim().length <= 0) {
      $(".error").show();
      $(".error span").html('Please enter Password, It cannot be left blank.');
      flag = false;
    }else if($("[name='board_id[]']:checked").length <= 0){
      $(".error").show();
      $(".error span").html('Please select at-least one board location.');
      flag = false;
    }
    return flag;
  });

  var user_type = $( "#user_type" ).val();
  geUserData(user_type);
  function geUserData(user_type){
    var url = "<?php echo base_url('auth_admin/get_user_data');?>";
    $.ajax({
      type: "POST",
        url: url,
        dataType:'json',
        data: "user_type="+user_type, 
        type:'post',
        success: function(data){
          $('#users').find('tbody').empty(); 
          var $tr = $('<tr align="center" style="color:White;background-color:#990000;font-weight:bold;font-style:normal;text-decoration:none;">').append(
              $('<td style="width:30%; line-height:25px;">').text('USERID'),
              $('<td style="width:30%; line-height:25px;">').text('PASSWORD'),
              $('<td style="width:30%; line-height:25px;">').text('USER TYPE'),
              $('<td style="width:30%; line-height:25px;">').text('ACTION')
            ).appendTo('#users');
          var i = 0;
          $.each(data,function(i,item){
            if(i%2==0){
              var backgroud = "#FFFBD6";
            }else{
              var backgroud = "white";
            }
            var name = item.user_name;
            var type = item.user_type;
            var $tr = $('<tr align="center" style="color:#333333;background-color:'+backgroud+'">').append(
              $('<td style="line-height:25px;">').text(name.toUpperCase()),
              $('<td style="line-height:25px;">').text(item.p_key),
              $('<td style="line-height:25px;">').text(type.toUpperCase()),
              $('<td style="line-height:25px;">').html("<a class='editbtn' onclick='confirmEdit();' href='<?php echo base_url(); ?>auth_admin/user_edit/"+item.id+"'>EDIT </a><a onclick='confirmDelete();' href='<?php echo base_url(); ?>auth_admin/delete_user/"+item.id+"' > DELETE</a>"),
            ).appendTo('#users');
            i++;
          }); 
        }
    });
  }
  $('.cancel').click(function(){
     window.location.href='<?php echo base_url(); ?>auth_admin/user_add';
     return false;
  })
  $("select#user_type").change(function(){
    var user_type = $("select option:selected").val();
    geUserData(user_type);
  });
});
function confirmEdit() {
    return confirm('Are you sure you want to edit this record?');
}
function confirmDelete() {
    return confirm('Are you sure you want to delete this record?');
}

</script>