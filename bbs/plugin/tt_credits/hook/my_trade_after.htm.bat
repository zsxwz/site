<div class="tt_card"><div class="tt_card_title"><?php echo lang('tran_credits');?></div><div class="tt_content">
    <form method="post" id="form_trans" action="<?php echo url('my-trade');?>">
        <input type="text" class="form-control" maxlength="36" id="trans_username" name="trans_username" placeholder="请输入对方用户名" style="width: 35%;display:inline-block;"/>
        <input type="text" class="form-control" maxlength="36" id="trans_num" name="trans_num" placeholder="请输入转账的金额" style="width: 50%;display:inline-block;margin-left:8px;" oninput="trans_ONInput($('#trans_num'));"/>
        <select name="trans_credits" class="form-control" style="margin-top:6px;width:35%">
            <option value="1"><?php echo lang('credits1');?></option>
            <option value="2" selected><?php echo lang('credits2');?></option>
            <option value="3"><?php echo lang('credits3');?> (单位:分)</option>
        </select>
        <button type="button" class="btn btn-info" id="trans_use" data-loading-text="<?php echo lang('submiting');?>..." style="right:10%;position:absolute;margin-top:-36px;"><?php echo lang('tran_credits');?></button></form></div></div>