<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class SampleApiController extends Controller
{

    public function __construct()
    { }

    public function __invoke(Request $request)
    {
        return response()->json([
            "status" => "success",
            "request" => $request->input()
        ]);
    }

}
