<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class PostController extends Controller
{

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $posts = Post::with(["user", "comments", "likes"])->latest()->get();

    return Inertia::render(
      component: 'posts/index',
      props: ['posts' => $posts, "csrf_token" => csrf_token()]
    );
  }


  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('posts/create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $data = $request->validate([
      'caption' => 'required',
      'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $imagePath = $request->file('image')->store('uploads', 'public');

    auth()->user()->posts()->create([
      'caption' => $data['caption'],
      'image_path' => $imagePath,
    ]);

    return to_route('profile.user.show', auth()->user()->id);
  }

  /**
   * Display the specified resource.
   */
  public function show(Post $post)
  {
    $post = $post->load(["user", "comments.user", "likes"]);

    return Inertia::render('posts/show', [
      'post' => $post,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Post $post)
  {
    if (auth()->id() !== $post->user_id) {
      return Redirect::back()->with('error', 'Unauthorized action.');
    }

    $post = $post->load("user");

    return Inertia::render('posts/create', [
      'postToEdit' => $post,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Post $post)
  {
    if (auth()->id() !== $post->user_id) {
      return Redirect::back()->with('error', 'Unauthorized action.');
    }

    $data = $request->validate([
      'caption' => 'required',
      'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->hasFile("image")) {
      if ($request->user()->profile_image) {
        Storage::disk("public")->delete($post->image_path);
      }

      $imagePath = $request->file('image')->store('uploads', 'public');
      $data['image_path'] = $imagePath;
    }

    $post->update($data);

    return to_route('post.show', ["post" => $post]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Post $post)
  {
    if (auth()->id() !== $post->user_id) {
      return Redirect::back()->with('error', 'Unauthorized action.');
    }

    Storage::disk('public')->delete($post->image_path);

    $post->delete();

    return to_route('profile.user.show', auth()->user()->id);
  }
}
