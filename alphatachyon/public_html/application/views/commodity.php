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
      <h1> CREATE COMMODITY</h1>
      <form action="<?php echo base_url(); ?>auth_admin/commodity" method="POST" id="commodity_add">
      <ul>
        <li>
          <span>Type :</span>
          <select name="type">
            <?php foreach($category as $cat):?>
             <option value="<?php echo $cat->id;?>"><?php echo strtoupper($cat->cat_name);?></option>
            <?php endforeach;?>
          </select>
        </li>
         <li>
          <span>ENGLISH NAME :</span>
          <input id="eng_item_name" name="eng_item_name" type="text" class="uid">
        </li>
         <li>
          <span>HINDI NAME :</span>
          <input id="hindi_item_name" name="hindi_item_name" type="text" class="uid">
        </li>
         <li>
         <input type="submit" value="SAVE" name="submit">
          <button class="cancel">CANCEL</button>
        </li>
       </ul>
     </form>
    </div>
    <div class="error alert alert-danger text-center" style="display:none;margin-bottom:15px;">
      <strong style="display:block;"></strong>
    </div>
    <div id="success" class="alert alert-success text-center" style="margin-bottom:15px;">
      <strong>Commodity details has been updated successfully.</strong>
    </div>
    <?php if($this->session->flashdata('error_msg') != ''){ ?>
        <div class="error">
          <span><?php echo $this->session->flashdata('error_msg');?></span>
        </div>
      <?php } ?>
      <?php if($this->session->flashdata('success_msg') != ''){ ?>
        <div class="success alert alert-success text-center" style="margin-bottom:15px;">
          <strong><?php echo $this->session->flashdata('success_msg');?></strong>
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
    if ($("#eng_item_name").val().trim().length <= 0) {
      $(".error").show();
      $(".error strong").html('Please enter English Item name, It cannot be left blank.');
      flag = false;
    }else if ($("#hindi_item_name").val().trim().length <= 0) {
      $(".error").show();
      $(".error strong").html('Please enter Hindi Item name, It cannot be left blank.');
      flag = false;
    }
    return flag;
  });

  $('.cancel').click(function(){
    window.location.href='<?php echo base_url(); ?>auth_admin/commodity';
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
      url: '<?=base_url()?>auth_admin/ajax_commodity/'+pagno,
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
      tr += "<td align='center'>ENGLISH NAME</td>";
      tr += "<td align='center'>HINDI NAME</td>";
      tr += "<td align='center'>TYPE</td>";
      tr += "<td align='center'>ACTION</td>";
      tr += "</tr>";
      $('#commodity tbody').append(tr);
     var i=0;
    for(index in result){
      var background = (i%2==0) ? "#E3EAEB" : "white";
      var cat_name = result[index].cat_name;
      var eng_item_name = result[index].eng_item_name;
      var hindi_item_name = result[index].hindi_item_name;
      var id = result[index].id;
      var cat_id = result[index].cat_id;
     
      var tr = "<tr align='center' id='view"+id+"' style='background-color:"+background+";line-height:34px;font-size:12px;'>";
      tr += "<td><span id='engname"+id+"'+>"+ eng_item_name +"</span></td>";
      tr += "<td><span id='hindiname"+id+"'+>"+ hindi_item_name +"</span></td>";
      tr += "<td><span id='cname"+id+"'+>"+ cat_name +"</span></td>";
      tr += "<td><a class='editbtn' onclick='confirmEdit("+id+");' href='javascript:void(0);'>EDIT </a><a onclick='confirmDelete();' href='<?php echo base_url(); ?>auth_admin/delete_commodity/"+id+"' > DELETE</a></td>";
      tr += "</tr>";
      tr += "<tr align='center' id='edit"+id+"' style='display:none; background-color:#7C6F57;line-height:34px;font-size:12px;'>";
      tr += "<td><input style='padding:0px 0px 0px 10px;' type='text' id='eng"+id+"' value='"+eng_item_name+"' class='uid'></td>";
      tr += "<td><input style='padding:0px 0px 0px 10px;' type='text' id='hind"+id+"' value='"+hindi_item_name+"' class='uid'></td>";
      tr += "<td><select id='cat"+id+"' class='mySelect'><?php foreach($category as $cat){ ?><option value='<?php echo $cat->id;?>' dataTag='<?php echo $cat->cat_name;?>' ><?php echo $cat->cat_name;?></option><?php } ?></select></td>";
      tr += "<td><a class='editbtn' onclick='updateData("+id+");' href='javascript:void(0);' style='color:#fff;'> UPDATE </a><a onclick='cancelRequest();' href='javascript:void(0);' style='color:#fff;'> CANCEL</a></td>";
      tr += "</tr>";
      $('#commodity tbody').append(tr);
      i++;
      $('#cat'+id).find('option[value="'+cat_id+'"]').attr("selected", "selected");
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
  var engItemName = $("#eng"+id).val();
  var hinItemName = $("#hind"+id).val();
  var categoryId = $("#cat"+id).val();
  var categoryName = $("#cat"+id).find('option:selected').attr('dataTag');
  $.ajax({
    url: '<?=base_url()?>auth_admin/update_commodity',
    type: 'post',
    data: 'id='+id+'&engItemName='+engItemName+'&hinItemName='+hinItemName+'&category='+categoryId,
    success: function(response){
      if(response == '1'){
        $("#edit"+id).hide();
        $("#view"+id).show();
        $('#engname'+id).html(engItemName);
        $('#hindiname'+id).html(hinItemName);
        $('#cname'+id).html(categoryName);
        $("#success").show();
      }
    }
  });
}
</script>  
