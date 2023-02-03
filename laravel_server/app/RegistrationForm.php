<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class RegistrationForm extends Model
{

    protected $fillable = [
        'name', 'father', 'mother', 'burn_place_date' ,
        'burn_city' , 'registered_place_num' , 'nationality',
        'certificate' , 'certificate_date' , 'register_type' ,
        'Payment_number' , 'user_id'
    ];
     
    public function user()
    {
        return $this->hasOne('App\User');
    }
}
