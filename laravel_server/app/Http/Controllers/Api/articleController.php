<?php

namespace App\Http\Controllers\Api;

use App\Article;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;

class articleController extends Controller
{
    public $successStatus = 200;

    public function getArticles()
    {
        $articles = Article::all();
        $serverUrl = URL::to('/storage\/');

        foreach ($articles as $article) {
            if (isset($article->image)) {
                $article->image = $serverUrl . $article->image;
            }
        }
        
        return response()->json(['data' => $articles, 'status' => '1'], 200);
    }

}
