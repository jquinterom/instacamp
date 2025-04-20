<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', [DashboardController::class, "index"])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';


Route::get("/", [PostController::class, "index"])
  ->middleware("auth")
  ->name("home");

// Post
Route::get("/posts", [PostController::class, "index"])->name("post.index");
Route::get("/posts/create", [PostController::class, "create"])->name("post.create");
Route::post("/posts", [PostController::class, "store"])->name("post.store");
Route::get("/posts/{post}", [PostController::class, "show"])->name("post.show");
Route::get("/posts/{post}/edit", [PostController::class, "edit"])->name("post.edit");
Route::patch("/posts/{post}", [PostController::class, "update"])->name("post.update");
Route::delete("/posts/{post}", [PostController::class, "destroy"])->name("post.destroy");

// Profile
Route::get("/profile/{user}", [ProfileController::class, "show"])->name("profile.user.show");
Route::get("/profile/{user}/edit", [ProfileController::class, "edit"])->name("profile.user.edit");
Route::patch("/profile/{user}", [ProfileController::class, "update"])->name("profile.user.update");

// Comment
Route::post("/posts/{post}/comments", [CommentController::class, "store"])->name("comments.store");
Route::delete("/comments/{comment}", [CommentController::class, "destroy"])->name("comments.destroy");

// Like
Route::post("/posts/{post}/likes", [LikeController::class, "store"])->name("likes.store");
Route::delete("/posts/{post}/likes", [LikeController::class, "destroy"])->name("likes.destroy");
