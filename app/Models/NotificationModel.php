<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 8/21/2018
 * Time: 4:29 PM
 */
namespace App\Models;

use Backpack\CRUD\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class NotificationModel extends Model
{
    use CrudTrait;
    protected $table = 'csn_notifications';
    protected $primaryKey = 'id';
    protected $fillable =
        [
            'user_id' ,'text', 'type', 'read', 'notification_id', 'music_id', 'link_url'
        ];

}
