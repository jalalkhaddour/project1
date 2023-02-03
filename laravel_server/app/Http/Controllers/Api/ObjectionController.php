<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Objection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ObjectionController extends Controller
{
    public $successStatus = 200;

    public function store(Request $request)
    {
        if (!Auth::check())
            return response()->json(['error' => $e, 'status' => '-1'], 200);

        if (Auth::check()) {

            $objection = new Objection();

            $input = $request->all();
            $student = Auth::user();

            $objection["course"] = $input["course"];
            $objection["type"] = $input["type"];
            $objection["body"] = $input["body"];
            $objection["year"] = $input["year"];
            $objection["part"] = $input["part"];
            $objection["university_id"] = $input["university_id"];
            $objection["user_id"] = $student["id"];

            $objection->save();

            return response()->json(
                [
                    'status' => '1',
                    'data' => $objection,
                    'message' => 'Successfully created user!'
                ],
                $this->successStatus
            );
        }
    }


    public function getObjection()
    {
        if (!Auth::check())
            return response()->json(['error' => $e, 'status' => '-1'], 200);

        if (Auth::check()) {
            $student_id = Auth::user()->id;
            $objections = Objection::where('user_id', $student_id)->get();
            return response()->json(
                [
                    'status' => '1',
                    'data' => $objections,
                    'message' => 'Successfully created user!'
                ],
                $this->successStatus
            );
        }
    }
}
