<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function index()
  {
    $posts = Post::with(["user", "comments", "likes"])->latest()->get();

    return Inertia::render(
      component: 'posts/index',
      props: ['posts' => $posts, "csrf_token" => csrf_token()]
    );

  }
}