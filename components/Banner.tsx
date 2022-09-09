import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import {Movie} from '../typings'
import {baseUrl} from '../constants/movie'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';

interface Props { 
  netflixOriginals: Movie[];
}

function Banner({netflixOriginals}: Props) {
  // so here this means the movie is type Movie or it can be null , and by default it can be null as well
  const [movie , setMovie]  = 
  useState<Movie | null>(null)
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])
  console.log(movie)


  return (
		<div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end ">
			<div className="absolute -z-10 top-0 left-0 h-[95vh] w-screen ">
				<Image
					src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
					layout="fill"
					objectFit="cover"
				/>
			</div>

			<h1 className="text-2xl md:text-4xl font-bold lg:text-7xl ">
				{movie?.title || movie?.name}
			</h1>
			<p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
				{movie?.overview}
			</p>

			<div className='flex space-x-3'>
				<button className="bannerButton bg-white text-black">
					<PlayArrowIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
					Play
				</button>
				<button 
				className="bannerButton bg-[gray]/70 "
				onClick={() => {
					setCurrentMovie(movie)
					setShowModal(true)
				}}>
					More Info <InfoIcon className="h-5 w-5 md:h-8 md:w-8" />
				</button>
			</div>
		</div>
	);
}

export default Banner