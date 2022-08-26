<?php 
  $this->load->view('common/header'); 
  $this->load->view('common/nav');   
?>
<!-- Content start Here -->
<section class="rowContent">
<div class="container">
  <div class="innerRowBox">
   <div class="createUserBox">
    <div class="createComudity">
      <h1> CREATE COMMODITY TYPE</h1>
      <form action="<?php echo base_url(); ?>auth_admin/commodity_type" method="POST" id="commodity_add">
      <ul>
        <li>
          <span>Type :</span>
          <input id="type" name="cat_name" type="text" class="uid">
        </li>
         <li>
         <input type="submit" value="SAVE" name="submit">
          <button class="cancel">CANCEL</button>
        </li>
       </ul>
     </form>
    </div>
    <div class="error alert alert-danger text-center" style="display:none; margin-bottom:15px;">
      <strong></strong>
    </div>
    <div id="success" class="alert alert-success text-center" style="margin-bottom:15px;">
      <strong>Commodity details has been updated successfully.</strong>
    </div>
    <?php if($this->session->flashdata('error_msg') != ''){ ?>
        <div class="error alert alert-danger text-center" style="margin-bottom:15px;">
          <strong><?php echo $this->session->flashdata('error_msg');?></strong>
        </div>
      <?php } ?>
      <?php if($this->session->flashdata('success_msg') != ''){ ?>
        <div class="success alert alert-success text-center">
          <span><?php echo $this->session->flashdata('success_msg');?></span>
        </div>
    <?php } ?>
    <table id="commodity" cellspacing="0" cellpadding="4" align="Center" style="color:#333333;width:100%;border-collapse:collapse;">
      <tbody>
      <tr align="center" style="color:White;background-color:#1C5E55;font-weight:bold;font-size:14px;line-height:24px;">
      </tr>
      </tbody>
    </table>
    <!-- Paginate -->
    <div style='margin-top: 10px;' id='pagination'></div>
    </div>
  </div>  
</div>
</section>
<!-- Content End Here -->
<?php $this->load->view('common/footer'); ?>

<script>  
$(document).ready(function(){

  //Validation start//
  $('#commodity_add').submit(function() {
    var flag = true;
    if ($("#type").val().trim().length <= 0) {
      $(".error").show();
      $(".error strong").html('Please enter Commodity type, It cannot be left blank.');
      flag = false;
    }
    return flag;
  });

  $('.cancel').click(function(){
    window.location.href='<?php echo base_url(); ?>auth_admin/commodity_type';
    return false;
  })

  // Detect pagination click
  $('#pagination').on('click','a',function(e){
    e.preventDefault(); 
    var pageno = $(this).attr('data-ci-pagination-page');
    loadPagination(pageno);
  });

  loadPagination(0);

  // Load pagination
  function loadPagination(pagno){
    $.ajax({
      url: '<?=base_url()?>auth_admin/ajax_commodity_type/'+pagno,
      type: 'get',
      dataType: 'json',
      success: function(response){
        $('#pagination').html(response.pagination);
        createTable(response.result);
      }
    });
  }

  // Create table list
  function createTable(result){
    $('#commodity tbody').empty();
    var tr = "<tr align='center' style='color:White;background-color:#1C5E55;font-weight:bold;font-size:14px;line-height:24px;'>";
      tr += "<td align='center'>TYPE</td>";
      tr += "<td align='center'>ACTION</td>";
      tr += "</tr>";
      $('#commodity tbody').append(tr);
    var i=0;
    for(index in result){
      var background = (i%2==0) ? "#E3EAEB" : "white";
      var type = result[index].cat_name;
      var tr = "<tr align='center' id='view"+result[index].id+"' style='background-color:"+background+";line-height:34px;font-size:12px;'>";
      tr += "<td><span id='ctype"+result[index].id+"'+>"+ type +"</span></td>";
      tr += "<td><a class='editbtn' onclick='confirmEdit("+result[index].id+");' href='javascript:void(0);'>EDIT </a><a onclick='confirmDelete();' href='<?php echo base_url(); ?>auth_admin/delete_commodity_type/"+result[index].id+"' > DELETE</a></td>";
      tr += "</tr>";
      tr += "<tr align='center' id='edit"+result[index].id+"' style='display:none; background-color:#7C6F57;line-height:34px;font-size:12px;'>";
      tr += "<td><input style='padding:0px 0px 0px 10px;' type='text' id='type"+result[index].id+"' value='"+type+"' class='uid'></td>";
      tr += "<td><a class='editbtn' onclick='updateData("+result[index].id+");' href='javascript:void(0);' style='color:#fff;'> UPDATE </a><a onclick='cancelRequest();' href='javascript:void(0)' style='color:#fff;'> CANCEL</a></td>";
      tr += "</tr>";
      $('#commodity tbody').append(tr);
      i++;
    }
  }
  
});
$("#success").hide();
function confirmEdit(id) {
  var data = confirm('Are you sure you want to edit this record?');
  $("tr[id^='edit']").hide();
  $("tr[id^='view']").show();
  $("#success").hide();
  $(".success").hide();
  if(data == true){
    $("#edit"+id).show();
    $("#view"+id).hide();
    return false;
  }
}
function confirmDelete() {
  return confirm('Are you sure you want to delete this record?');
}
function cancelRequest() {
  $("tr[id^='edit']").hide();
  $("tr[id^='view']").show();
}

function updateData(id) {
  var type = $("#type"+id).val();
  $.ajax({
    url: '<?=base_url()?>auth_admin/update_commodity_type',
    type: 'post',
    data: 'id='+id+'&type='+type,
    success: function(response){
      if(response == '1'){
        $("#edit"+id).hide();
        $("#view"+id).show();
        $('#ctype'+id).html(type);
        $("#success").show();
      }
    }
  });
}
</script>  
