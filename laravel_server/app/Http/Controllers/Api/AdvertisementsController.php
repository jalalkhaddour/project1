<?php

namespace App\Http\Controllers\Api;

use App\Advertisement;
use App\Http\Controllers\Controller;

class AdvertisementsController extends Controller
{
    public $successStatus = 200;

    public function getAds()
    {
        $ads = Advertisement::all();
        
        return response()->json(['data' => $ads, 'status' => '1'], $this->successStatus);
    }

}
