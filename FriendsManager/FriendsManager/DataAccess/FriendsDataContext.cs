using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FriendsManager.DataAccess
{
    public class FriendsDataContext : DbContext
    {
        public FriendsDataContext(DbContextOptions<FriendsDataContext> options)
        : base(options)
        { }

        public DbSet<Friend> Friend { get; set; }
    }
}
