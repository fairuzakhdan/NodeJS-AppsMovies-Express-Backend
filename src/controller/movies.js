// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const movies = require('../movies/movies');

const app = express();
app.use(express.json());

const addMovies = (req, res) => {
  const {
    nameMovie, category, duration, price,
  } = req.body;
  const id = nanoid(16);
  const inserted = new Date().toISOString();
  const updated = inserted;
  const newMovies = {
    id, nameMovie, category, duration, price, inserted, updated,
  };
  movies.push(newMovies);
  if (!nameMovie) {
    res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan Movie,input name Movie',
    });
    return res;
  }

  const isSuccess = movies.filter((movie) => movie.id).length > 0;
  if (isSuccess) {
    res.status(200).json({
      status: 'success',
      message: 'Movie berhasil ditambahkan',
      data: {
        movieId: id,
      },
    });
    return res;
  }
  return res;
};

const getallMovies = (req, res) => {
  const moviesMap = movies.map((movie) => ({
    idMovie: movie.id,
    nameMovie: movie.nameMovie,
  }));

  res.status(200).json({
    status: 'success',
    movies: moviesMap,
  });
};

const getByIdMovies = (req, res) => {
  const { movieId } = req.params;
  const movie = movies.filter((m) => m.id === movieId)[0];
  if (movie !== undefined) {
    res.status(200).json({
      status: 'success',
      message: 'Detail Movies',
      movie,
    });
    return res;
  }
  res.status(404).json({
    status: 'fail',
    message: 'Movies tidak ditemukan',
  });
  return res;
};

const updateById = (req, res) => {
  const { movieId } = req.params;
  const {
    nameMovie, category, duration, price,
  } = req.body;
  if (!nameMovie) {
    res.status(400).json({
      status: 'fail',
      message: 'Gagal Memperbarui buku,Mohon isi nama buku terlebih dahulu',
    });
  }
  const updated = new Date().toISOString();
  const index = movies.findIndex((movie) => movie.id === movieId);
  if (index !== -1) {
    movies[index] = {
      ...movies[index],
      nameMovie,
      category,
      duration,
      price,
      updated,
    };
    res.status(200).json({
      status: 'success',
      message: 'Movie berhasil diperbarui',
    });
    return res;
  }
  res.status(404).json({
    status: 'fail',
    message: 'Gagal memperbarui Movie,id tidak ditemukan',
  });
  return res;
};
module.exports = {
  addMovies, getallMovies, getByIdMovies, updateById,
};
