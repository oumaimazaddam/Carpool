<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class TripController extends Controller
{
   

    public function index()
    {
        $trips = Trip::all();
        return response()->json($trips);
    }
    public function show($id)
    {
        $trip = Trip::findOrFail($id);
        return response()->json($trip);
    }

    public function store(Request $request)
    {

        $user = Auth::user();

        dd($user);
        $validator = Validator::make($request->all(), [
            'departure' => 'required|string',
            'destination' => 'required|string',
            'departure_time' => 'required|date_format:H:i',
            'estimate_arrival_time' => 'required|date_format:H:i',
            'price' => 'required|numeric',
          
            'rating' => 'nullable|numeric|between:0,5',
            'instant_booking' => 'nullable|boolean',
            'available_seats' => 'nullable|integer|min:1',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
          $driverId = $request->get('driver_id', 1);
        $trip = Trip::create([
            'departure' => $request->get('departure'),
            'destination' => $request->get('destination'),
            'departure_time' =>$request->get('departure_time'),
            'estimate_arrival_time' =>$request->get('estimate_arrival_time'),
            'price' =>$request->get('price'),
            'rating' =>$request->get('rating'),
            'instant_booking' =>$request->get('instant_booking'),
            'available_seats' =>$request->get('available_seats'),
            'driver_id' => $driverId,
        ]);
       
        return response()->json([
            'user' => $user,
            'trip' => $trip,
    ], 201);

    }

    public function update(Request $request, $id)
    {
        $trip = Trip::findOrFail($id);

        $validatedData = $request->validate([
            'departure' => 'nullable|string',
            'destination' => 'nullable|string',
            'departure_time' => 'nullable|date_format:H:i',
            'estimate_arrival_time' => 'nullable|date_format:H:i',
            'price' => 'nullable|numeric',
            
            'rating' => 'nullable|numeric|between:0,5',
            'instant_booking' => 'nullable|boolean',
            'available_seats' => 'nullable|integer|min:1',
        ]);

        $trip->update($validatedData);
        return response()->json($trip);
    }

  
    public function destroy($id)
    {
        $trip = Trip::findOrFail($id);
        $trip->delete();
        return response()->json(['message' => 'Trip deleted successfully']);
    }
}
