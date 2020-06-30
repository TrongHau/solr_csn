<?php
namespace App\Repositories\Notification;

use App\Repositories\EloquentRepository;
use Carbon\Carbon;
use DB;

class NotificationEloquentRepository extends EloquentRepository implements NotificationRepositoryInterface
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return \App\Models\NotificationModel::class;
    }
    /**
     * Get all posts only published
     * @return mixed
     */
    public function getAllPublished()
    {
        $result = $this->_model->where('is_published', 1)->get();

        return $result;
    }

    /**
     * Get post only published
     * @param $id int Post ID
     * @return mixed
     */
    public function findOnlyPublished($id)
    {
        $result = $this
            ->_model
            ->where('id', $id)
            ->where('is_published', 1)
            ->first();

        return $result;
    }
    public function pushNotif($user_id, $notify_id, $type, $text = '', $linkUrl, $musicId = '')
    {
        $notifyExits = $this->getModel()::where([['user_id', $user_id], ['notification_id', $notify_id], ['link_url', $linkUrl]])->orderBy('id', 'desc')->first();
        if($notifyExits) {
            if(strtotime($notifyExits->created_at) >= strtotime(TIME_NEW_DUPLICATE_NOTIFY)) {
                return false;
            }
        }
        $result = $this->create([
            'user_id' => $user_id,
            'notification_id' => $notify_id,
            'text' => $text,
            'type' =>$type,
            'read' => 0,
            'music_id' => $musicId,
            'link_url' => $linkUrl,
        ]);
        return $result;
    }

}

