<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the portfolio's reusable navigation and interactive project demonstrations in `src/components/portfolio.tsx`; both the homepage and case studies share them so project states stay consistent.
- Keep the eight homepage chapters on `/` with in-page anchors because the requested experience is one continuous editorial journey; use separate routes only for the two shareable case studies.
