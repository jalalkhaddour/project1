<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

use App\RegistrationForm;
use App\StudentInfoByYear;

class RegistratioController extends Controller
{
    public $successStatus = 200;

    public function store(Request $request)
    {
        $student_form = new RegistrationForm();

        if (!Auth::check())
            return response()->json(['error' => $e, 'status' => '-1'], 200);

        if (Auth::check()) {

            $input = $request->all();
            $student = Auth::user();

            if ($student->registrationForm == null) {
                $student_form = $this->getInputForm($input);
                $student_form["user_id"] = $student["id"];
                $img_path_1 = $this->saveImgInStorage($input["personal_identification_img"]);
                $img_path_2 = $this->saveImgInStorage($input["certificate_img"]);
                $student_form["personal_identification_img"] =  $img_path_1;
                $student_form["certificate_img"] =  $img_path_2;
                $student_form->save();
            } else {
                $fieldArray = [];
                foreach ($input as $key => $value) {
                    if ($key != "personal_identification_img" || $key != "certificate_img")
                        $fieldArray[$key] = $value;
                }
                $img_path_1 = $this->saveImgInStorage($input["personal_identification_img"]);
                $img_path_2 = $this->saveImgInStorage($input["certificate_img"]);
                $fieldArray["personal_identification_img"] =  $img_path_1;
                $fieldArray["certificate_img"] =  $img_path_2;
                // update fun param is array 
                $student_form = RegistrationForm::where("user_id", $student->id)->update($fieldArray);
            }

            return response()->json(
                [
                    'status' => '1',
                    'message' => 'Successfully Registration form!'
                ],
                $this->successStatus
            );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        if (!Auth::check())
            return response()->json(['error' => $e, 'status' => '-1'], 200);

        if (Auth::check()) {

            $student = Auth::user();
            $student_id = $student->id;

            // $student_Form = RegistrationForm::where('user_id', $student_id)->get();
            $student_Form = RegistrationForm::where('user_id', $student_id)->first();

            return response()->json(
                [
                    'data' => $student_Form,
                    'status' => '1',
                    'message' => 'Successfully get registration form!'
                ],
                $this->successStatus
            );
        }
    }


    public function getInputForm($input)
    {
        $student_form = new RegistrationForm();

        $student_form["name"] = $input["name"];
        $student_form["father"] = $input["father"];
        $student_form["mother"] = $input["mother"];
        $student_form["burn_place_date"] = $input["burn_place_date"];
        $student_form["burn_city"] = $input["burn_city"];
        $student_form["registered_place_num"] = $input["registered_place_num"];
        $student_form["nationality"] = $input["nationality"];
        $student_form["certificate"] = $input["certificate"];
        $student_form["certificate_date"] = $input["certificate_date"];
        $student_form["register_type"] = $input["register_type"];
        $student_form["Payment_number"] = $input["Payment_number"];
        return $student_form;
    }

    public function saveImgInStorage($imgField)
    {
        $personal_identification_img = $imgField;
        $path_prefix = 'public/students';

        // Get filename with extension
        $filenameWithExt_1 = $personal_identification_img->getClientOriginalName();

        // Get just the filename
        $filename_1 = pathinfo($filenameWithExt_1, PATHINFO_FILENAME);

        // Get extension
        $extension_1 = $personal_identification_img->getClientOriginalExtension();

        // Create new filename
        $filenameToStore_1 = $filename_1 . '_' . time() . '.' . $extension_1;

        // Uplaod file
        $path = $personal_identification_img->storeAs($path_prefix, $filenameToStore_1);

        return 'students/' . $filenameToStore_1;
    }


    public function studentYearsInfo(Request $request)
    {
        $student = Auth::user();
        $data = StudentInfoByYear::where('user_id', $student->id)->get();
        return response()->json(
            [
                'data' => $data,
                'status' => '1',
                'message' => 'Successfully get registration form!'
            ],
            $this->successStatus
        );
    }
}
