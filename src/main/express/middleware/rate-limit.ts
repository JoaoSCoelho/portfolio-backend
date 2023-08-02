import rateLimit, { Options } from 'express-rate-limit'

export const limiter = (options?: Partial<Options>) =>
  rateLimit({
    max: 600,
    windowMs: 60 * 1000, // 1 minute
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    message: {
      message:
        'Calma lá jovem, ta abusando já! Aguarda um bocadinho pra fazer mais requisições',
    },
    legacyHeaders: true, // Enable the `X-RateLimit-*` headers
    skip: () => process.env.NODE_ENV === 'test',
    ...options,
  })
