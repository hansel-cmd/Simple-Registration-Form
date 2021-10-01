<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\Verify;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class AuthController extends Controller
{
    public function register(Request $request) {
        
        $request->validate([
            'email'         => ['required', 'email'],
            'password'      => ['required'],
            'username'      => ['required'],
            'first_name'    => ['required'],
            'last_name'     => ['required']
        ]);

        $check_user = User::where('email', $request->email)->first();
        $check_user_name = User::where('username', $request->username)->first();

        if ($check_user) {
            throw ValidationException::withMessages([
                'error' => ['Email already taken']
            ]);
        }
        
        if ($check_user_name) {
            throw ValidationException::withMessages([
                'error' => ['Username is already taken.']
            ]);
        }

        $token = Str::random(20);

        $user = new User([
            'email'                 => $request->email,
            'username'                  => $request->username,
            'first_name'            => $request->first_name,
            'last_name'            => $request->last_name,
            'password'              => Hash::make($request->password),
            'verification_token'    => $token
        ]);

        $user->save();

        $subject = 'Verify Account';
        $link = 'http://localhost:8000/#/auth?token='.$token;
        Mail::to($request->email)->send(new Verify($subject, $link));

        return $user;
        // return $token;
    }

    public function verify(Request $request) {
        $request->validate([
            'token'    => ['required']
        ]);

        $user = User::where('verification_token', $request->token)->where('verified', false)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                "verified" => false,
                'message' => 'Verification failed.'
            ]);
        } else {

            $user->verified = true;
            $user->verification_token = null;
            $user->save();

        }

        return [
            "verified" => [true],
            "message" => ["You are now verified."]
        ];
    }


    function login(Request $request) {
        
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();


        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'error' => ['These credentials do not match our records.']
            ]);
        } else if ($user->verified == false) {
            throw ValidationException::withMessages([
                'error' => ['Please verify your email.']
            ]);
        }

        $token = Str::random(20);
        $user->session_token = $token;
        $user->save();

        return [
            'token' => $user->createToken('Token Name')->accessToken,
            'user' => $user,
            'session_token' => $token
        ];
    }

    function getUserInfo(Request $request) {
        return User::where('user_id', $request->user_id)->first();
    }

    function getToken(Request $request) {
        return User::where('user_id', $request->user_id)->get(['users.session_token']);
    }
}