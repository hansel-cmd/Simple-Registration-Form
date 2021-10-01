<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\Verify;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class PostController extends Controller
{

    public function createPost(Request $request) {

        $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'user_id' => ['required'],
        ]);

        $post = new Post([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'body' => $request->body
        ]);

        $post->save();
        
        return $post;
    }
    
    public function getAllPost(Request $request) {
        return Post::get();
    }

    
}