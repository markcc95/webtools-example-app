<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;

class PatientController extends Controller
{
    public function index(Request $request): Response
    {
        $url = Request::query('url');
        
        if($url == null) {
            $patientsResponse = Http::withHeaders([
                'accept' => 'application/fhir+json',
            ])->get('https://hapi.fhir.org/baseR4/Patient', [
                'name' => Request::query('name')
            ]);
        }
        else {
            $patientsResponse = Http::withHeaders([
                'accept' => 'application/fhir+json',
            ])->get($url);
        }

        if($patientsResponse) 
        
        $patients = $patientsResponse->json()['entry'] ?? null;
        $nextPageUrl = $patientsResponse->json()['link'] ?? null;

        return Inertia::render('Patient/Index', [
            'patients' => $patients,
            'resourceUrls' => $nextPageUrl
        ]);
    }

    public function show(string $id): Response
    {
        $patientsResponse = Http::withHeaders([
            'accept' => 'application/fhir+json',
        ])->get("https://hapi.fhir.org/baseR4/Patient/$id");

        $patient = $patientsResponse->json();

        return Inertia::render('Patient/Show', [
            'patient' => $patient,
        ]);
    }
}
