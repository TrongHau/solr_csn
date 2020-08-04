<?php
use App\Library\Helpers;
global $allpage_banner;
global $sb_banner;
global $memberVip;

$sb_banner = false;
if($memberVip == null)
    $memberVip = Helpers::checkMemberVip();
?>
<!DOCTYPE html>
<html>
@include('web.layouts.header')
<body>
<!--  Yo verify campaign 16/8/2019 -->
<script type="text/javascript" async defer src="//ss.yomedia.vn/js/1/230/ads.js"></script>


<div id="fb-root"></div>
<section class="wrapper_content">
@include('web.layouts.wapper')

@hasSection('hidden_wapper')
@endif


    @hasSection('in_home')
    @else
    @endif

@hasSection('in_edit')
@else

@endif

@yield('content')

@include('web.layouts.footer')
</section>
@yield('contentJS')

@hasSection('in_edit')
@else
    @if(!$memberVip)
        @hasSection('in_player')
{{--            @if(View::exists('cache.code_ads.pc_ballon_player'))--}}
                @include('cache.code_ads.pc_ballon_player')
            {{--@endif--}}
        @else
{{--            @if(View::exists('cache.code_ads.pc_ballon_home'))--}}
                @include('cache.code_ads.pc_ballon_home')
            {{--@endif--}}
        @endif

        @hasSection('in_home')
        @else
            <?php
            $cookie_name = "csn_popup_pc";
            $session_ads_popup = isset($_COOKIE[$cookie_name]) ? intval(unserialize(stripslashes($_COOKIE[$cookie_name]))) : 0;
            if ($session_ads_popup < 1) {
                @setcookie($cookie_name, serialize($session_ads_popup + 1), time() + 30, '/', '.chiasenhac.vn', 0);

                // Blueseed - Mobile In flow - Popup // backup code Ambient
                //echo '<!-- BlueSeed - asynchronous code for placement 1883 Chiasenhac InFlow Desktop -->
                //<script id="jshd1pm_1883" src="https://d2.blueseed.tv/ads-sync.js?placement=1883"></script>';
            }
            ?>
        @endif
    @endif
@endif

</body>
</html>
