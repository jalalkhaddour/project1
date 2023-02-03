<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class AuthController extends Controller
{

    public $successStatus = 200;

    // جديد انشاء حساب 
    public function register(Request $request)
    {
        $rules = [
            'name' => 'required|max:30',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'c_password' => 'required|same:password',
            'phone' => 'required|numeric|min:10'
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors(), 'status' => '-1'], $this->successStatus);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        try {
            $user = User::create($input);
        } catch (Exception $e) {
            return response()->json(['error' => $e, 'status' => '-1'], $this->successStatus);
        }

        $data['token'] =  $user->createToken('AppName')->accessToken;
        $data['name'] = $user->name;
        $data['email'] = $user->email;
        $data['phone'] = $user->phone;

        return response()->json(
            [
                'status' => '1',
                'data' => $data,
                'message' => 'Successfully created user!'
            ],
            $this->successStatus
        );
    }


    // تسجيل دخول
    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors(), 'status' => '-1'], $this->successStatus);
        }

        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {

            $user = Auth::user();

            $data['name'] = $user->name;
            $data['email'] = $user->email;
            $data['phone'] = $user->phone;
            $data['token'] =  $user->createToken('AppName')->accessToken;

            return response()->json(
                [
                    'status' => '1',
                    'data' => $data,
                    'message' => 'Successfully login user!'
                ],
                $this->successStatus
            );
        } else {
            return response()->json(['data' => 'check your password and email', 'status' => '-1'], $this->successStatus);
        }
    }
}
