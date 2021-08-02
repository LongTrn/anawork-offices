import axios from "axios";

export default axios.create({
	baseURL: "http://27.74.255.96:8089",
	headers: {
		"Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9kaW5odGhpZW5AZ21haWwuY29tIiwiZXhwIjoxNjM2MTc4ODIxLCJpc3MiOiJhbmF3b3JrLmNvbSIsImF1ZCI6ImFuYXdvcmsuY29tIn0.kNmVRbuNhZ0kU-9XXf1j2DtMzVBw2IOQti0h2hrZFSo",
		// "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9kaW5odGhpZW5AZ21haWwuY29tIiwiZXhwIjoxNjM2MTgxNTgxLCJpc3MiOiJhbmF3b3JrLmNvbSIsImF1ZCI6ImFuYXdvcmsuY29tIn0.ybuiSs-OVhQ7nDH0TMmVw_qWaQrKvK7xjr7DwXGA5u0",
		"Content-type": "application/json, multipart/form-data",
		"Access-Control-Allow-Origin": "http://27.74.255.96:8089",
	}
})