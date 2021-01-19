@extends('web.layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="centering text-center error-container">
                    <div class="text-center">
                        <h2 class="without-margin"><span class="text-danger">
                                <?php
                                    if ( stristr($message, 'bản quyền') ) $message = 'CSN chưa được cấp bản quyền đăng tải bài hát này.<br>Các bạn vui lòng không upload!<br><br>';
                                    echo $message ?? 'Bạn không có quyền truy cập, thoát ra ngay :(('
                                ?>
                            </span></h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection