<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/ping', 'Sync\SorlSyncController@ping');
Route::get('/sync/solr_music', 'Sync\SolrSyncController@syncMusic');
Route::get('/sync/solr_video', 'Sync\SolrSyncController@syncVideo');
Route::get('/sync/solr_artist', 'Sync\SolrSyncController@syncArtist');
Route::get('/sync/solr_cover', 'Sync\SolrSyncController@syncCover');
//Route::get('/sync/demo', 'Sync\MusicListenDownloadController@realVideoDownload');
Route::get('/sync/solr_music_delete', 'Sync\SolrSyncController@syncDeleteMusic');
Route::get('/sync/solr_video_delete', 'Sync\SolrSyncController@syncDeleteVideo');

Route::get('/sync/demo', 'Sync\MusicController@demo');
Route::get('/sync/cover_hot', 'Sync\AlbumController@albumHot');
Route::get('/sitemap_category.xml', 'Sitemap@category');
Route::get('/sitemap_artist.xml', 'Sitemap@topArtist');
Route::get('/sitemap_video.xml', 'Sitemap@newVideo');
//Route::get('/sync/demo2', 'Sync\UploaderController@uploader');

Route::group(['middlewareGroups' => ['web']], function () {
    Auth::routes();
//    Route::get('login', ['as' => 'login', 'uses' => 'HomeController@index']);

    // sync data
    Route::prefix('sync')->group(function () {
        Route::get('album', 'Sync\AlbumController@syncAlbum');
        Route::get('album_cat', 'Sync\AlbumCatController@syncAlbum');
        Route::get('download', 'Sync\MusicDownloadController@syncMusicDownload');
        Route::get('bxh_category', 'Sync\BxhCategoryController@syncBxhCategory');
        Route::get('demo_cover', 'Sync\SolrSyncController@demo');
        Route::get('bxh_category/{month}/{year}', 'Sync\BxhCategoryController@syncBxhCategoryMonthYear'); // month = all || 1->12
        Route::get('sug_category', 'Sync\SuggestionCatController@suggestion');
        Route::get('solr_video', 'Sync\SolrSyncController@syncVideo');
        Route::get('solr_delete_video', 'Sync\SolrSyncController@syncDeleteVideo');
        Route::get('solr_music', 'Sync\SolrSyncController@syncMusic');
        Route::get('solr_delete_music', 'Sync\SolrSyncController@syncDeleteMusic');
        Route::get('solr_artist', 'Sync\SolrSyncController@syncArtist');
    });
    Route::get('chinh-sach-chia-se-nhac', 'HomeController@policy');
    Route::get('chinh-sach-chia-se-nhac.html', 'HomeController@policy');

    Route::post('/sys/error_slow_bug', ['as' => 'error.slow_bug', 'uses' => 'SystemController@addBugSlow']);

    Route::get('/mp3/hot/hot-{year}', ['as' => 'bxh.month', 'uses' => 'BxhController@year']);

    Route::get('/logout', 'User\UserController@logout');
    Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);
    Route::get('/home', ['as' => 'HomeController.index', 'uses' => 'HomeController@index']);

    // Socialite
    Route::get('auth/facebook', 'Auth\AuthFacebookController@redirectToProvider');
    Route::get('auth/facebook/callback', 'Auth\AuthFacebookController@handleProviderCallback');
    Route::get('auth/google', 'Auth\AuthGoogleController@redirectToProvider');
    Route::get('auth/google/callback', 'Auth\AuthGoogleController@handleProviderCallback');
    Route::get('/xac-nhan-email/{token}', 'User\UserController@verifyEmail');


    // Category
//    Route::get('mp3/{cat}.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
//    Route::get('mp3/{cat}', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
//    Route::get('mp3/{cat}/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);

    // sub category riêng tránh trùng với link nhạc single mới update



    Route::get('mp3/vietnam.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
    Route::get('mp3/us-uk.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
    Route::get('mp3/chinese.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
    Route::get('mp3/korea.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
    Route::get('mp3/japan.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
    Route::get('mp3/france.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
    Route::get('mp3/other.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
    Route::get('mp3/beat-playback.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);



    Route::get('mp3/vietnam/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);
    Route::get('mp3/us-uk/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);
    Route::get('mp3/chinese/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);
    Route::get('mp3/korea/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);
    Route::get('mp3/japan/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);
    Route::get('mp3/france/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);
    Route::get('mp3/other/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);
    Route::get('mp3/beat-playback/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);



//    Route::get('hd/{cat}.html', ['as' => 'category.get1', 'uses' => 'CategoryController@index1']);
    Route::get('hd/video.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index1']);
    Route::get('hd/video/{sub}.html', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);
    Route::get('hd/video/{sub}', ['as' => 'category.get2', 'uses' => 'CategoryController@index2']);
    Route::post('tab_category', ['as' => 'category.get_tab', 'uses' => 'CategoryController@getTabCategory']);



    // BXH
    Route::get('nhac-hot.html', ['as' => 'bxh.now', 'uses' => 'BxhController@now']);
    Route::get('nhac-hot', ['as' => 'bxh.now', 'uses' => 'BxhController@now']);

    Route::get('bang-xep-hang/tuan.html', ['as' => 'bxh.month', 'uses' => 'BxhController@week']);
    Route::get('bang-xep-hang/tuan', ['as' => 'bxh.month', 'uses' => 'BxhController@week']);

    Route::get('bang-xep-hang/thang-{month}-{year}.html', ['as' => 'bxh.month', 'uses' => 'BxhController@month']);
    Route::get('bang-xep-hang/thang-{month}-{year}', ['as' => 'bxh.month', 'uses' => 'BxhController@month']);

    Route::get('bang-xep-hang/nam-{year}.html', ['as' => 'bxh.month', 'uses' => 'BxhController@year']);
    Route::get('bang-xep-hang/nam-{year}', ['as' => 'bxh.month', 'uses' => 'BxhController@year']);


    Route::get('bang-xep-hang/{cat}', ['as' => 'bxh.cat', 'uses' => 'BxhController@cat']);


    // listen music
    // single old
    Route::get('mp3/{cat}/{sub}/{musicUrl}.html', ['as' => 'music.listen', 'uses' => 'MusicController@oldListenSingleMusic']);
    Route::get('mp3/{cat}/{sub}/{musicUrl}', ['as' => 'music.listen', 'uses' => 'MusicController@oldListenSingleMusic']);

    // change new url listen music (ver 2)
    Route::get('mp3/{cat}/{sub}/{id}/{artist}.html', ['as' => 'music.listen', 'uses' => 'MusicController@newListenSingleMusic']);
    Route::get('mp3/{cat}/{sub}/{id}/{artist}', ['as' => 'music.listen', 'uses' => 'MusicController@newListenSingleMusic']);

    Route::get('mp3/{cat}/{sub}/{id}/{artist}/{urlMusic}.html', ['as' => 'music.listen', 'uses' => 'MusicController@newListenSingleMusic']);
    Route::get('mp3/{cat}/{sub}/{id}/{artist}/{urlMusic}', ['as' => 'music.listen', 'uses' => 'MusicController@newListenSingleMusic']);



    // new link url listen music (ver 3)

    Route::get('mp3/{artist}/{urlMusic}.html', ['as' => 'music.listen', 'uses' => 'MusicController@newLinkListenSingleMusic']);
    Route::get('mp3/{artist}/{urlMusic}', ['as' => 'music.listen', 'uses' => 'MusicController@newLinkListenSingleMusic']);

    Route::get('mp3/{urlMusic}.html', ['as' => 'music.listen', 'uses' => 'MusicController@newLinkListenSingleMusic']);
    Route::get('mp3/{urlMusic}', ['as' => 'music.listen', 'uses' => 'MusicController@newLinkListenSingleMusic']);




    // video-clip
    Route::get('hd/{cat}/{sub}/{musicUrl}.html', ['as' => 'music.video', 'uses' => 'MusicController@oldListenSingleMusic']);
    Route::get('hd/{cat}/{sub}/{musicUrl}', ['as' => 'music.video', 'uses' => 'MusicController@oldListenSingleMusic']);

    // change new url listen music

    Route::get('hd/{cat}/{sub}/{id}/{artist}.html', ['as' => 'music.video', 'uses' => 'MusicController@newListenSingleMusic']);
    Route::get('hd/{cat}/{sub}/{id}/{artist}', ['as' => 'music.video', 'uses' => 'MusicController@newListenSingleMusic']);

    Route::get('hd/{cat}/{sub}/{id}/{artist}/{urlMusic}.html', ['as' => 'music.video', 'uses' => 'MusicController@newListenSingleMusic']);
    Route::get('hd/{cat}/{sub}/{id}/{artist}/{urlMusic}', ['as' => 'music.video', 'uses' => 'MusicController@newListenSingleMusic']);


    // new link url video-clip (ver 3)
    Route::get('hd/{artist}/{musicUrl}.html', ['as' => 'music.video', 'uses' => 'MusicController@newLinkListenSingleMusic']);
    Route::get('hd/{artist}/{musicUrl}', ['as' => 'music.video', 'uses' => 'MusicController@newLinkListenSingleMusic']);

    Route::get('hd/{musicUrl}.html', ['as' => 'music.video', 'uses' => 'MusicController@newLinkListenSingleMusic']);
    Route::get('hd/{musicUrl}', ['as' => 'music.video', 'uses' => 'MusicController@newLinkListenSingleMusic']);



    // embed
    Route::get('embed/mp3/{cat}/{sub}/{musicUrl}.html', ['as' => 'music.listen', 'uses' => 'MusicController@embed']);
    Route::get('embed/mp3/{cat}/{sub}/{musicUrl}', ['as' => 'music.listen', 'uses' => 'MusicController@embed']);
    Route::get('embed/hd/{cat}/{sub}/{musicUrl}.html', ['as' => 'music.video', 'uses' => 'MusicController@embed']);
    Route::get('embed/hd/{cat}/{sub}/{musicUrl}', ['as' => 'music.video', 'uses' => 'MusicController@embed']);

    // album
    Route::get('nghe-album/{musicUrl}.html', ['as' => 'music.album.listen', 'uses' => 'MusicController@UrlAlbum']);
    Route::get('nghe-album/{musicUrl}', ['as' => 'music.album.listen', 'uses' => 'MusicController@UrlAlbum']);

    // album (delete)
    Route::get('nghe-album/{musicId}/{musicUrl}.html', ['as' => 'music.album.listen', 'uses' => 'MusicController@newUrlPlayList']);
    Route::get('nghe-album/{musicId}/{musicUrl}', ['as' => 'music.album.listen', 'uses' => 'MusicController@newUrlPlayList']);

    // playlist
    Route::get('playlist/{playlistUrl}.html', ['as' => 'music.playlist.listen', 'uses' => 'MusicController@oldUrlPlayList']);
    Route::get('playlist/{playlistUrl}', ['as' => 'music.playlist.listen', 'uses' => 'MusicController@oldUrlPlayList']);
    // playlist new url
    Route::get('playlist/{id}/{playlistUrl}.html', ['as' => 'music.playlist.listen', 'uses' => 'MusicController@newUrlPlayList']);
    Route::get('playlist/{id}/{playlistUrl}', ['as' => 'music.playlist.listen', 'uses' => 'MusicController@newUrlPlayList']);

    Route::get('playlist_publisher/{playlistUrl}.html', ['as' => 'music.playlist.listen', 'uses' => 'MusicController@oldUrlPlayList']);
    Route::get('playlist_publisher/{playlistUrl}', ['as' => 'music.playlist.listen', 'uses' => 'MusicController@oldUrlPlayList']);
    Route::get('nghe-bat-hat-ca-si/{playlistUrl}', ['as' => 'music.playlist.listen', 'uses' => 'MusicController@caSiPlaylist']);
    Route::get('nghe-bat-hat-yeu-thich/{playlistUrl}', ['as' => 'music.playlist.listen', 'uses' => 'MusicController@listenFavourite']);
    // artist
    Route::get('ca-si/{artistUrl}.html', ['as' => 'artist.home', 'uses' => 'ArtistController@index']);
    Route::get('ca-si/{artistUrl}', ['as' => 'artist.home', 'uses' => 'ArtistController@index']);
    Route::post('ca-si/favorite', ['as' => 'artist.home', 'uses' => 'ArtistController@favorite']);
    Route::get('tab_artist', ['as' => 'artist.get_tab', 'uses' => 'ArtistController@getTabArtist']);

    // nhac hot, bang xep hang
    Route::get('nhac-hot/{catUrl}/{catLevel?}.html', ['as' => 'music.nhac-hot.listen', 'uses' => 'MusicController@listenBxhNow']);
    Route::get('nhac-hot/{catUrl}/{catLevel?}', ['as' => 'music.nhac-hot.listen', 'uses' => 'MusicController@listenBxhNow']);

    Route::get('bang-xep-hang/tuan/{catUrl}/{catLevel?}.html', ['as' => 'bxh.month', 'uses' => 'MusicController@listenBxhWeek']);
    Route::get('bang-xep-hang/tuan/{catUrl}/{catLevel?}', ['as' => 'bxh.month', 'uses' => 'MusicController@listenBxhWeek']);

    Route::get('bang-xep-hang/thang-{month}-{year}/{catUrl}/{catLevel?}.html', ['as' => 'bxh.month', 'uses' => 'MusicController@listenBxhMonth']);
    Route::get('bang-xep-hang/thang-{month}-{year}/{catUrl}/{catLevel?}', ['as' => 'bxh.month', 'uses' => 'MusicController@listenBxhMonth']);

    Route::get('bang-xep-hang/nam-{year}/{catUrl}/{catLevel?}.html', ['as' => 'bxh.month', 'uses' => 'MusicController@listenBxhYear']);
    Route::get('bang-xep-hang/nam-{year}/{catUrl}/{catLevel?}', ['as' => 'bxh.month', 'uses' => 'MusicController@listenBxhYear']);


    Route::get('upload_copyright.html', ['as' => 'bxh.now', 'uses' => 'CatalogController@copyright']);
    Route::get('upload_copyright', ['as' => 'bxh.now', 'uses' => 'CatalogController@copyright']);

    // ajax comment
    Route::get('binh-luan/get_ajax', ['as' => 'comment.get_ajax', 'uses' => 'CommentController@getAjaxCommentByMusicId']);
    Route::post('music/history_listen', ['as' => 'music.history_listen', 'uses' => 'MusicController@historyListen']);
    Route::get('lich-su-nghe', ['as' => 'music.history_listen', 'uses' => 'MusicController@historyListen']);

    Route::post('music/favourite', ['as' => 'user.uploaded', 'uses' => 'MusicController@musicFavourite']);

    // Search
    Route::get('tim-kiem', ['as' => 'search.index', 'uses' => 'SearchController@index']);
    Route::get('/search/real', 'SearchController@ajaxSearch');
    Route::get('/dang-tai/ca-si/tim-kiem', 'ArtistController@getTermArtist');
    // count download
    Route::post('/count/download', ['as' => 'music.count_download', 'uses' => 'MusicController@countDownload']);

    // download album
    Route::post('download-album', ['as' => 'music.album.listen', 'uses' => 'MusicController@downloadAlbum']);

    // User
    Route::prefix('user/')->group(function () {
        Route::get('{id}', ['as' => 'user.index', 'uses' => 'User\UserController@index']);
        Route::get('redirect/{music_id}', ['as' => 'user.redirect', 'uses' => 'User\UserMusicController@musicUploadedRedirect']);
        Route::get('music_uploaded/redirect/{music_id}', ['as' => 'user.redirect', 'uses' => 'User\UserMusicController@musicUploadedRedirect']);
        Route::post('{id}/music_recents', ['as' => 'user.uploaded', 'uses' => 'User\UserMusicController@musicRecent']);
        Route::post('music_uploaded', ['as' => 'user.uploaded', 'uses' => 'User\UserMusicController@musicUploaded']);
        Route::post('artist_favourite', ['as' => 'user.uploaded', 'uses' => 'User\UserMusicController@artistFavourite']);
        Route::post('video_favourite', ['as' => 'user.uploaded', 'uses' => 'User\UserMusicController@videoFavourite']);
        Route::post('music_favourite', ['as' => 'user.uploaded', 'uses' => 'User\UserMusicController@musicFavourite']);
        Route::post('qr_code', ['as' => 'user.qr_code', 'uses' => 'User\UserController@qrCode']);
    });
    Route::prefix('chu-de/')->group(function () {
        Route::get('{url}.html', ['as' => 'catalog.index', 'uses' => 'CatalogController@playlistPublisher']);
        Route::get('{url}', ['as' => 'catalog.index', 'uses' => 'CatalogController@playlistPublisher']);
    });
    ///// catalog
    Route::get('bai-hat-moi', ['as' => 'catalog.music', 'uses' => 'CatalogController@musicNews']);
    Route::get('video-moi', ['as' => 'catalog.video', 'uses' => 'CatalogController@videoNews']);
    Route::get('album-moi', ['as' => 'catalog.album', 'uses' => 'CatalogController@albumNews']);
    Route::get('bai-hat-moi.html', ['as' => 'catalog.music', 'uses' => 'CatalogController@musicNews']);
    Route::get('video-moi.html', ['as' => 'catalog.video', 'uses' => 'CatalogController@videoNews']);
    Route::get('album-moi.html', ['as' => 'catalog.album', 'uses' => 'CatalogController@albumNews']);


    Route::post('music/check_music_bitrate',['as'=>'music.check_music_bitrate','uses'=>'MusicController@checkMusicBitrate']);




    Route::group(['middleware' => ['auth']], function() {

        Route::group(['middleware' => ['isActive']], function() {
            // upload selector
            Route::prefix('dang-tai/')->group(function () {
                Route::get('/', ['as' => 'upload.index', 'uses' => 'UploadController@index']);
                Route::post('/noi-dung-chinh-sua-dang-tai', ['as' => 'upload.suggest', 'uses' => 'UploadController@suggest']);
                Route::get('ca-si', ['as' => 'upload.createArtist', 'uses' => 'UploadController@createArtist']);
                Route::post('ca-si', ['as' => 'upload.storeArtist', 'uses' => 'UploadController@storeArtist']);
                Route::get('ca-si/{urlArtist}', ['as' => 'upload.suggestArtist', 'uses' => 'UploadController@suggestArtist']);
                Route::post('ca-si/{urlArtist}', ['as' => 'upload.storeSuggestArtist', 'uses' => 'UploadController@storeSuggestArtist']);
                Route::get('nhac/{musicId?}', ['as' => 'upload.createMusic', 'uses' => 'UploadController@createMusic']);
                Route::get('video/{musicId?}', ['as' => 'upload.createVideo', 'uses' => 'UploadController@createVideo']);
                Route::post('nhac/{musicId?}', ['as' => 'upload.storeMusic', 'uses' => 'UploadController@storeMusic']);
                Route::post('video', ['as' => 'upload.storeVideo', 'uses' => 'UploadController@storeMusic']);
                Route::post('video/{musicId?}', ['as' => 'upload.storeVideo', 'uses' => 'UploadController@storeMusic']);
                Route::get('album/{albumId?}', ['as' => 'upload.createAlbum', 'uses' => 'UploadController@createAlbum']);
                Route::post('album/{albumId?}', ['as' => 'upload.storeAlbum', 'uses' => 'UploadController@storeAlbum']);
                Route::post('file-nhac', ['as' => 'upload.fileMusic', 'uses' => 'UploadController@uploadFileMusic']);
            });
        });


        Route::group(['middleware' => ['isActive']], function() {
            // Comment
            Route::prefix('comment')->group(function () {
                Route::post('post', ['as' => 'comment.create', 'uses' => 'CommentController@postComment']);
                Route::post('block', ['as' => 'comment.delete', 'uses' => 'CommentController@blockComment']);
            });
            // Music
            Route::prefix('music')->group(function () {
                Route::get('suggestion_lyric', ['as' => 'music.get_lyric', 'uses' => 'MusicController@suggestionLyric']);
                Route::post('suggestion_lyric', ['as' => 'music.get_lyric', 'uses' => 'MusicController@suggestionLyric']);
                Route::get('suggestion_karaoke', ['as' => 'music.get_karaoke', 'uses' => 'MusicController@suggestionKaraoke']);
                Route::post('suggestion_karaoke', ['as' => 'music.sugg_karaoke', 'uses' => 'MusicController@suggestionKaraoke']);
                Route::post('merge', ['as' => 'music.merge', 'uses' => 'MusicController@mergeMusic']);
                Route::post('approve_merge', ['as' => 'music.approve_merge', 'uses' => 'MusicController@approveMusic']);
            });
        });

        // Playlist
        Route::prefix('user/playlist/')->group(function () {
            Route::get('danh-sach-playlist', ['as' => 'playlist.play_list', 'uses' => 'PlaylistController@getPlayList']);
            Route::post('create-playlist', ['as' => 'playlist.play_list', 'uses' => 'PlaylistController@createPlayList']);
            Route::post('add-music-playlist', ['as' => 'playlist.play_list', 'uses' => 'PlaylistController@addMusicPlayList']);
            Route::get('cap-nhat/{id}', ['as' => 'playlist.update_playlist', 'uses' => 'PlaylistController@editPlaylist']);
            Route::post('cap-nhat/{id}', ['as' => 'playlist.store_playlist', 'uses' => 'PlaylistController@storePlaylist']);
            Route::get('chinh-sua', ['as' => 'playlist.edit_playlist', 'uses' => 'PlaylistController@editPagePlaylist']);
            Route::get('them', ['as' => 'playlist.create_playlist', 'uses' => 'PlaylistController@createPagePlaylist']);
            Route::post('them', ['as' => 'playlist.store_playlist', 'uses' => 'PlaylistController@storePlaylist']);
            Route::post('delete', ['as' => 'playlist.delete_playlist', 'uses' => 'PlaylistController@deletePlaylist']);
        });

        // User
        Route::prefix('user/')->group(function () {
            Route::post('update', ['as' => 'user.index', 'uses' => 'User\UserController@store']);
        });

        // Report
        Route::prefix('report/')->group(function () {
            Route::post('comment', ['as' => 'report.comment', 'uses' => 'ReportController@reportComment']);
            Route::post('music', ['as' => 'report.music', 'uses' => 'ReportController@reportMusic']);
        });

        Route::get('roles',['as'=>'roles.index','uses'=>'RoleController@index']);
        Route::get('roles/create',['as'=>'roles.create','uses'=>'RoleController@create']);


        Route::post('roles/create',['as'=>'roles.store','uses'=>'RoleController@store']);
        Route::get('roles/{id}',['as'=>'roles.show','uses'=>'RoleController@show']);
        Route::get('roles/{id}/edit',['as'=>'roles.edit','uses'=>'RoleController@edit']);
        Route::patch('roles/{id}',['as'=>'roles.update','uses'=>'RoleController@update']);
        Route::delete('roles/{id}',['as'=>'roles.destroy','uses'=>'RoleController@destroy']);


    });
    //// payment
    Route::group([
        'namespace'  => 'Payment',
        'prefix'     => 'payment',
    ], function () {
        Route::get('request_level', ['as' => 'payment.cen_level', 'uses' => 'PaymentController@createPaymentCenLevel']);
        Route::get('request_voucher', ['as' => 'payment.voucher', 'uses' => 'PaymentController@createPaymentVoucher']);
        Route::get('request_zalopay', ['as' => 'payment.voucher', 'uses' => 'PaymentController@createPaymentZaloPay']);
    });

    ///// Newstin-noi-bat
    Route::get('tin-tuc.html', ['as' => 'news.index.html', 'uses' => 'News\HomeController@index']);

    Route::get('tin-tuc/demo1', ['as' => 'news.index', 'uses' => 'Sync\NewsCategoryController@popularNewsCategory']);
    Route::get('tin-tuc/demo2', ['as' => 'news.index', 'uses' => 'Sync\NewsCategoryController@popularNewsPost']);

    Route::get('sync-tin-tuc', ['as' => 'news.index', 'uses' => 'Sync\NewsCategoryController@syncArticle']);
    Route::group([
        'namespace'  => 'News',
        'prefix'     => 'tin-tuc',
    ], function () {
        Route::get('/', ['as' => 'news.index', 'uses' => 'HomeController@index']);
        Route::get('tin-noi-bat', ['as' => 'news.category.index', 'uses' => 'CategoryController@Popular']);
        Route::get('tin-moi-nhat', ['as' => 'news.category.index', 'uses' => 'CategoryController@NewsPost']);
        Route::get('sao-viet', ['as' => 'news.category.index', 'uses' => 'CategoryController@index']);
        Route::get('sao-han', ['as' => 'news.category.index', 'uses' => 'CategoryController@index']);
        Route::get('sao-au-my', ['as' => 'news.category.index', 'uses' => 'CategoryController@index']);

        Route::get('tin-noi-bat.html', ['as' => 'news.category.index', 'uses' => 'CategoryController@Popular']);
        Route::get('tin-moi-nhat.html', ['as' => 'news.category.index', 'uses' => 'CategoryController@NewsPost']);
        Route::get('sao-viet.html', ['as' => 'news.category.index', 'uses' => 'CategoryController@categorySao_viet']);
        Route::get('sao-han.html', ['as' => 'news.category.index', 'uses' => 'CategoryController@categorySao_han']);
        Route::get('sao-au-my.html', ['as' => 'news.category.index', 'uses' => 'CategoryController@categorySao_au_my']);

        Route::get('{slug}p-{id}.html', ['as' => 'news.detail.index', 'uses' => 'DetailController@index']);
        Route::get('{slug}p-{id}', ['as' => 'news.detail.index', 'uses' => 'DetailController@index']);
        Route::get('tag/{tag}', ['as' => 'news.detail.index', 'uses' => 'CatalogController@tag']);
    });
});

