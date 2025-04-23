export interface ApiError extends Error {
  statusCode?: number;
}