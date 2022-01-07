export default function ListHabits() {
  return (
    <>
    <h5>Habits</h5>
    <table class="striped">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Status</th>
                <th><a href="/habits/add/" class="btn btn-float"><i class="fas fa-plus"></i></a></th>
            </tr>
        </thead>
        <tbody>

        <tr>
            <td><img src="" class="circle responsive-img img-tiny" /></td>
            <td><a href="/habits/">Title</a></td>
            <td><span class="dash-status">Actif</span></td>

            <td className="gh-options">
                <a href="/habits/edit/" class="btn btn-float">
                    <i class="fas fa-edit"></i>
                </a>

                <form action="/habits/" method="POST" id="delete-form">
                    <input type="hidden" name="_method" value="DELETE" />
                    <button type="submit" class="btn red">
                        <i class="fas fa-trash"></i>
                    </button>
                </form>
            </td>
        </tr>

        <tr>
            <td><img src="" class="circle responsive-img img-tiny" /></td>
            <td><a href="/habits/">Title</a></td>
            <td><span class="dash-status">Actif</span></td>

            <td className="gh-options">
                <a href="/habits/edit/" class="btn btn-float">
                    <i class="fas fa-edit"></i>
                </a>

                <form action="/habits/" method="POST" id="delete-form">
                    <input type="hidden" name="_method" value="DELETE" />
                    <button type="submit" class="btn red">
                        <i class="fas fa-trash"></i>
                    </button>
                </form>
            </td>
        </tr>
        <tr>
            <td><img src="" class="circle responsive-img img-tiny" /></td>
            <td><a href="/habits/">Title</a></td>
            <td><span class="dash-status">Actif</span></td>

            <td className="gh-options">
                <a href="/habits/edit/" class="btn btn-float">
                    <i class="fas fa-edit"></i>
                </a>

                <form action="/habits/" method="POST" id="delete-form">
                    <input type="hidden" name="_method" value="DELETE" />
                    <button type="submit" class="btn red">
                        <i class="fas fa-trash"></i>
                    </button>
                </form>
            </td>
        </tr>

        </tbody>
    </table>
    </>
  )
}
